'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { supabase } from "@/lib/supabaseClient";

// ✅ Fungsi konversi UTC → WIB
function formatToWIB(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false
  });
}

// Navbar Component
function Navbar() {
  const router = useRouter();

  const handleScrollOrNavigate = (e, targetId) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <nav className="w-full sticky top-0 left-0 z-30 bg-white/90 backdrop-blur border-b border-gray-300 shadow-sm py-3 px-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="text-2xl"></span> Sarasa Learn ✨
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-gray-700 hover:text-black font-medium transition"
        >
          Home
        </Link>
        <a
          href="/#kategori"
          className="text-gray-700 hover:text-black font-medium transition cursor-pointer"
        >
          Kategori
        </a>
        <a
          href="/#tentang"
          onClick={(e) => handleScrollOrNavigate(e, "tentang")}
          className="text-gray-700 hover:text-black font-medium transition cursor-pointer"
        >
          Tentang
        </a>
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-4 px-6 text-center text-neutral-500 text-sm mt-12">
      © {new Date().getFullYear()} eduqz.sarasa &middot; Dibuat dengan ❤️ untuk belajar
    </footer>
  );
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ✅ Fungsi simpan hasil kuis (UTC ke DB)
async function saveResult({ score, total_questions, correct_answers, id_mapel }) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("User belum login!");
    console.error("❌ Tidak ada userId di localStorage");
    return;
  }

  const parsedUserId = parseInt(userId, 10);
  const parsedMapelId = parseInt(id_mapel, 10);

  console.log("🔎 Akan menyimpan ke result:", {
    score,
    total_questions,
    correct_answers,
    taken_at: new Date().toISOString(), // ✅ simpan sebagai UTC ISO
    id_user: parsedUserId,
    id_mapel: parsedMapelId
  });

  const { data, error } = await supabase
    .from("result")
    .insert([{
      score,
      total_questions,
      correct_answers,
      taken_at: new Date().toISOString(), // ✅ tetap UTC
      id_user: parsedUserId,
      id_mapel: parsedMapelId
    }])
    .select();

  if (error) {
    console.error("❌ Gagal insert result:", error);
  } else {
    console.log("✅ Result berhasil disimpan:", data);
  }
}

export default function QuizPage({ questions, category }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const randomized = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
  }, [questions]);

  useEffect(() => {
    if (!showScore) {
      const timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showScore, startTime]);

  // ✅ Simpan hasil kuis saat selesai
  useEffect(() => {
    if (showScore && shuffledQuestions.length > 0) {
      const mapelId = {
        matematika: 1,
        english: 2,
        ipa: 3,
        bahasa_indonesia: 4
      }[category] || 0;

      saveResult({
        score: score,
        total_questions: shuffledQuestions.length,
        correct_answers: correctCount,
        id_mapel: mapelId
      });
    }
  }, [showScore]);

  if (shuffledQuestions.length === 0) return <div>Loading...</div>;

  const handleAnswer = () => {
    if (!selectedAnswer) return alert('Pilih jawaban!');
    const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].correct;

    if (isCorrect) {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);

      if (currentQuestion + 1 === shuffledQuestions.length) {
        setShowScore(true);
      } else {
        setTimeout(() => {
          setSelectedAnswer('');
          setCurrentQuestion((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setWrongCount((prev) => prev + 1);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setSelectedAnswer('');
    setShowExplanation(false);
    const next = currentQuestion + 1;
    if (next < shuffledQuestions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(((currentQuestion + (showScore ? 1 : 0)) / shuffledQuestions.length) * 100);
  const scorePercent = Math.round((score / shuffledQuestions.length) * 100);

  const ulangiKuis = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowScore(false);
    setShowExplanation(false);
    setCorrectCount(0);
    setWrongCount(0);
    setStartTime(Date.now());
    setElapsed(0);
    const randomized = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
  };

  const current = shuffledQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200 font-sans text-gray-900">
      <Navbar />
      <main id="quiz" className="flex flex-1 items-center justify-center p-6 pt-24">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-300">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center flex justify-center items-center gap-2">
            <span className="text-2xl">📝</span> {category.replace('-', ' ').toUpperCase()}
          </h1>

          <div className="flex justify-between mb-2 text-sm text-gray-700 font-medium">
            <div>
              Soal {showScore ? shuffledQuestions.length : currentQuestion + 1} dari {shuffledQuestions.length}
              {!showScore && <div className="text-gray-500 text-xs mt-1">Waktu: {formatTime(elapsed)}</div>}
            </div>
            <div className="text-right">Skor: {score}</div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-2 bg-gray-800 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {showScore ? (
            <div className="text-center">
              <p className="text-gray-800 font-semibold text-lg mb-4 flex justify-center items-center gap-2">
                Kuis Selesai! <span>🎉</span>
              </p>
              <div className="bg-gray-100 rounded-md py-6 mb-6">
                <p className="text-3xl font-bold text-gray-900">{score}/{shuffledQuestions.length}</p>
                <p className="text-gray-600">Skor Anda: {scorePercent}%</p>
              </div>
              <p className="mb-2 text-gray-700 font-semibold">
                Waktu pengerjaan: <span className="font-bold">{formatTime(elapsed)}</span>
              </p>
              <p className="mb-6 text-gray-700">
                Diselesaikan pada: <span className="font-bold">{formatToWIB(new Date().toISOString())}</span> WIB
              </p>
              <button
                onClick={ulangiKuis}
                className="bg-gray-800 text-white rounded-md py-3 px-6 mb-3 w-full hover:bg-black transition"
              >
                Ulangi Kuis
              </button>
              <Link
                href="/"
                className="bg-gray-800 text-white rounded-md py-3 px-6 w-full block hover:bg-black transition text-center"
              >
                Kembali ke Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center text-gray-900 font-semibold text-lg">
                {current.question}
              </div>
              <div key={currentQuestion} className="space-y-3 mb-6">
                {current.options.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-4 border rounded-full cursor-pointer transition-all
                      ${selectedAnswer === opt ? 'bg-gray-100 border-gray-600 scale-105' : 'border-gray-300'}
                      hover:bg-gray-100 hover:border-gray-500`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2
                        ${selectedAnswer === opt ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white'}
                        transition-all`}
                    >
                      {selectedAnswer === opt && (
                        <span className="w-3 h-3 bg-white rounded-full block"></span>
                      )}
                    </span>
                    <input
                      type="radio"
                      name="answer"
                      value={opt}
                      checked={selectedAnswer === opt}
                      onChange={() => setSelectedAnswer(opt)}
                      className="sr-only"
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>

              {showExplanation && !showScore && (
                <div className="text-center">
                  <p
                    className={`text-lg font-semibold mb-3 ${
                      selectedAnswer === current.correct ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {selectedAnswer === current.correct ? 'Benar!' : 'Salah'}
                  </p>
                  <p className="mb-6 text-gray-700">{current.explanation}</p>
                  <button
                    onClick={handleNext}
                    className="bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-black transition"
                  >
                    Soal Selanjutnya
                  </button>
                </div>
              )}

              {!showExplanation && !showScore && (
                <button
                  onClick={handleAnswer}
                  className="bg-gray-800 text-white py-3 px-6 rounded-md w-full hover:bg-black transition font-semibold"
                >
                  Jawab
                </button>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
