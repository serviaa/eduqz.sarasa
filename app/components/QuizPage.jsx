// app/quiz/[category]/page.js
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const quizData = {
  matematika: [
    { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "5 x 3 = ?", options: ["15", "10", "20", "12"], answer: "15" },
  ],
  ipa: [
    { question: "Planet terbesar di tata surya?", options: ["Bumi", "Jupiter", "Saturnus", "Mars"], answer: "Jupiter" },
    { question: "H2O adalah rumus kimia untuk?", options: ["Oksigen", "Hidrogen", "Air", "Karbon"], answer: "Air" },
  ],
  inggris: [
    { question: "Bahasa Inggris dari 'Meja'?", options: ["Chair", "Table", "Book", "Pen"], answer: "Table" },
    { question: "Bahasa Inggris dari 'Buku'?", options: ["Book", "Pencil", "Bag", "Board"], answer: "Book" },
  ],
};

export default function QuizPage() {
  const { category } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = quizData[category] || [];

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            QuizApp
          </Link>
          <div className="space-x-6">
            <Link href="/" className="text-neutral-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link href="/#kategori" className="text-neutral-700 hover:text-blue-600 font-medium transition">
              Kategori
            </Link>
            <Link href="/#tentang" className="text-neutral-700 hover:text-blue-600 font-medium transition">
              Tentang
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex flex-col justify-center items-center mt-20 px-4">
        <h1 className="text-2xl font-bold mb-6 capitalize">Kuis {category}</h1>

        {questions.length === 0 ? (
          <p className="text-gray-600">Kategori tidak ditemukan.</p>
        ) : showScore ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">
              Skor kamu: {score} / {questions.length}
            </h2>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Kembali ke Home
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full text-left px-4 py-2 border rounded-lg hover:bg-blue-50 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} QuizApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}