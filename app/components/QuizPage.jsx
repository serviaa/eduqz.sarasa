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

  // Format waktu
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-pink-200 relative">
        {/* Progress & Timer */}
        {!showScore && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-start">
              <span className="text-pink-600 font-bold">Soal Terjawab: {currentQuestion}/{questions.length}</span>
              <span className="text-pink-600 font-bold">Skor: {score}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-pink-600 font-bold">⏱️ Waktu: {formatTime(elapsed)}</span>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center flex items-center justify-center gap-2">
          {category.replace('-', ' ').toUpperCase()} <span>📝</span>
        </h1>

        {showScore ? (
          <div className="text-center">
            <p className="text-xl text-pink-700 mb-4">Hasil Kuis Anda:</p>
            <div className="flex justify-center gap-8 mb-6">
              <div className="bg-pink-100 rounded-xl p-4 shadow text-pink-700 font-bold">
                <span>✅ Benar: {correctCount}</span>
              </div>
              <div className="bg-pink-100 rounded-xl p-4 shadow text-pink-700 font-bold">
                <span>❌ Salah: {wrongCount}</span>
              </div>
            </div>
            <p className="text-5xl font-extrabold text-pink-600 mb-4">{score} / {questions.length}</p>
            <p className="text-lg text-pink-700 mb-4">Waktu pengerjaan: <span className="font-bold">{formatTime(elapsed)}</span></p>
            <Link href="/" className="bg-pink-500 text-white py-3 px-6 rounded-xl shadow hover:bg-pink-600">
              🔙 Kembali ke Home
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-pink-800 mb-3 text-center">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, i) => (
                  <label
                    key={i}
                    className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedAnswer === opt ? 'bg-pink-100 border-pink-400 scale-105' : 'border-pink-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={opt}
                      onChange={() => setSelectedAnswer(opt)}
                      className="sr-only"
                    />
                    <span className="text-pink-800">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {showExplanation ? (
              <div className="text-center">
                <p className={`text-lg font-semibold mb-3 ${
                  selectedAnswer === questions[currentQuestion].correct ? 'text-green-600' : 'text-red-500'
                }`}>
                  {selectedAnswer === questions[currentQuestion].correct ? 'Benar!' : 'Salah'}
                </p>
                <p className="mb-6 text-pink-700">{questions[currentQuestion].explanation}</p>
                <button onClick={handleNext} className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600">
                  {currentQuestion + 1 === questions.length ? 'Lihat Skor' : 'Soal Selanjutnya'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleAnswer}
                className="bg-pink-500 text-white py-3 px-6 rounded-lg shadow hover:bg-pink-600 w-full font-semibold"
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