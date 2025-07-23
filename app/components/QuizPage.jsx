'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuizPage({ questions, category }) {
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
    if (!showScore) {
      const timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showScore, startTime]);

  const handleAnswer = () => {
    if (!selectedAnswer) return alert('Pilih jawaban!');
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer('');
    setShowExplanation(false);
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  // Format waktu ke MM:SS
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Progress bar
  const progressPercent = Math.round(((currentQuestion + (showScore ? 1 : 0)) / questions.length) * 100);

  // Hitung persen skor
  const scorePercent = Math.round((score / questions.length) * 100);

  // Fungsi untuk reload kuis (reset state)
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-blue-200">
        {/* Judul Kuis */}
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center flex justify-center items-center gap-2">
          <span className="text-2xl">🎓</span> {category.replace('-', ' ').toUpperCase()}
        </h1>

        {/* Progress bar & skor saat kuis berjalan */}
        {!showScore && (
          <>
            <div className="flex justify-between mb-1 text-sm text-blue-700 font-medium">
              <div>Soal {currentQuestion + 1} dari {questions.length}</div>
              <div>Skor: {score}</div>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        )}

        {/* Tampilkan hasil akhir */}
        {showScore ? (
          <div className="text-center">
            {/* Garis pembatas atas */}
            <div className="border-t-2 border-green-600 mb-3"></div>

            <p className="text-green-700 font-semibold text-lg mb-4 flex justify-center items-center gap-2">
              Kuis Selesai! <span>🎉</span>
            </p>

            {/* Garis pembatas bawah */}
            <div className="border-b-2 border-green-600 mb-6"></div>

            <div className="bg-green-100 rounded-md py-6 mb-6">
              <p className="text-3xl font-bold text-green-700">{score}/{questions.length}</p>
              <p className="text-green-600">Skor Anda: {scorePercent}%</p>
            </div>

            <p className="mb-6 text-blue-700 font-semibold">
              Waktu pengerjaan: <span className="font-bold">{formatTime(elapsed)}</span>
            </p>

            <button
              onClick={ulangiKuis}
              className="bg-blue-600 text-white rounded-md py-3 px-6 mb-3 w-full hover:bg-blue-700 transition"
            >
              Ulangi Kuis
            </button>

            <Link
              href="/"
              className="bg-gray-600 text-white rounded-md py-3 px-6 w-full block hover:bg-gray-700 transition"
            >
              Kembali ke Home
            </Link>
          </div>
        ) : (
          <>
            {/* Soal dan pilihan jawaban */}
            <div className="mb-6 text-center text-blue-800 font-semibold text-lg">
              {questions[currentQuestion].question}
            </div>

            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-4 border rounded-full cursor-pointer transition-all
                    ${selectedAnswer === opt ? 'bg-blue-100 border-blue-500 scale-105' : 'border-blue-300'}
                    hover:bg-blue-50 hover:border-blue-400`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2
                      ${selectedAnswer === opt ? 'border-blue-600 bg-blue-500' : 'border-blue-300 bg-white'}
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
                    onChange={() => setSelectedAnswer(opt)}
                    className="sr-only"
                  />
                  <span className="text-blue-800">{opt}</span>
                </label>
              ))}
            </div>

            {/* Tombol dan penjelasan jawaban */}
            {showExplanation ? (
              <div className="text-center">
                <p
                  className={`text-lg font-semibold mb-3 ${
                    selectedAnswer === questions[currentQuestion].correct
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {selectedAnswer === questions[currentQuestion].correct ? 'Benar!' : 'Salah'}
                </p>
                <p className="mb-6 text-blue-700">{questions[currentQuestion].explanation}</p>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
                >
                  {currentQuestion + 1 === questions.length ? 'Lihat Skor' : 'Soal Selanjutnya'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleAnswer}
                className="bg-blue-600 text-white py-3 px-6 rounded-md w-full hover:bg-blue-700 transition font-semibold"
              >
                Jawab
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}