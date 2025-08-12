'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

// Navbar Component (smooth scroll + offset)
function Navbar() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80; // tinggi navbar dalam px
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="w-full sticky top-0 left-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm py-3 px-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <span className="text-2xl">📝</span> eduqz.sarasa
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/" className="text-neutral-700 hover:text-blue-600 font-medium transition">Home</Link>
        <a
          href="#kategori"
          onClick={(e) => handleScroll(e, 'kategori')}
          className="text-neutral-700 hover:text-blue-600 font-medium transition cursor-pointer"
        >
          <Link href="/#kategori">Kategori</Link>
        </a>
        <a
          href="#tentang"
          onClick={(e) => handleScroll(e, 'tentang')}
          className="text-neutral-700 hover:text-blue-600 font-medium transition cursor-pointer"
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

  // Inisialisasi soal dan acak opsi jawaban
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans">
      <Navbar />
      <main id="quiz" className="flex flex-1 items-center justify-center p-6 pt-24">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-200">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center flex justify-center items-center gap-2">
            <span className="text-2xl">📝</span> {category.replace('-', ' ').toUpperCase()}
          </h1>

          <div className="flex justify-between mb-2 text-sm text-blue-700 font-medium">
            <div>
              Soal {showScore ? shuffledQuestions.length : currentQuestion + 1} dari {shuffledQuestions.length}
              {!showScore && <div className="text-blue-500 text-xs mt-1">Waktu: {formatTime(elapsed)}</div>}
            </div>
            <div className="text-right">Skor: {score}</div>
          </div>

          <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-2 bg-blue-700 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {showScore ? (
            <div className="text-center">
              <p className="text-blue-800 font-semibold text-lg mb-4 flex justify-center items-center gap-2">
                Kuis Selesai! <span>🎉</span>
              </p>
              <div className="bg-blue-100 rounded-md py-6 mb-6">
                <p className="text-3xl font-bold text-blue-800">{score}/{shuffledQuestions.length}</p>
                <p className="text-blue-600">Skor Anda: {scorePercent}%</p>
              </div>
              <p className="mb-6 text-blue-700 font-semibold">
                Waktu pengerjaan: <span className="font-bold">{formatTime(elapsed)}</span>
              </p>
              <button
                onClick={ulangiKuis}
                className="bg-blue-700 text-white rounded-md py-3 px-6 mb-3 w-full hover:bg-blue-800 transition"
              >
                Ulangi Kuis
              </button>
              <Link
                href="/"
                className="bg-blue-700 text-white rounded-md py-3 px-6 w-full block hover:bg-blue-800 transition text-center"
              >
                Kembali ke Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center text-blue-800 font-semibold text-lg">
                {current.question}
              </div>
              <div key={currentQuestion} className="space-y-3 mb-6">
                {current.options.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-4 border rounded-full cursor-pointer transition-all
                      ${selectedAnswer === opt ? 'bg-blue-50 border-blue-500 scale-105' : 'border-blue-200'}
                      hover:bg-blue-50 hover:border-blue-400`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2
                        ${selectedAnswer === opt ? 'border-blue-700 bg-blue-700' : 'border-blue-200 bg-white'}
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
                    <span className="text-blue-800">{opt}</span>
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
                  <p className="mb-6 text-blue-700">{current.explanation}</p>
                  <button
                    onClick={handleNext}
                    className="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition"
                  >
                    Soal Selanjutnya
                  </button>
                </div>
              )}

              {!showExplanation && !showScore && (
                <button
                  onClick={handleAnswer}
                  className="bg-blue-700 text-white py-3 px-6 rounded-md w-full hover:bg-blue-800 transition font-semibold"
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