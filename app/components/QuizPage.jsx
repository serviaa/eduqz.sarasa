"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Ambil soal dari API atau file JSON
  useEffect(() => {
    fetch("/quizdata.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  // Smooth scroll agar section berada di tengah layar
  const handleScroll = (e, targetId) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;

      const offsetPosition =
        elementPosition - windowHeight / 2 + elementHeight / 2;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-800"
          >
            QuizApp
          </Link>
          <div className="flex space-x-6">
            <a
              href="#kategori"
              onClick={(e) => handleScroll(e, "kategori")}
              className="text-neutral-700 hover:text-blue-600 font-medium transition"
            >
              Kategori
            </a>
            <a
              href="#tentang"
              onClick={(e) => handleScroll(e, "tentang")}
              className="text-neutral-700 hover:text-blue-600 font-medium transition"
            >
              Tentang
            </a>
          </div>
        </div>
      </nav>

      {/* Konten Quiz */}
      <main className="flex-grow container mx-auto p-4 mt-20">
        {questions.length > 0 ? (
          showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Skor Anda: {score}</h2>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Ulangi Kuis
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-2">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.isCorrect)}
                    className="block w-full text-left border px-4 py-2 rounded hover:bg-gray-100"
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : (
          <p>Memuat pertanyaan...</p>
        )}
      </main>

      {/* Section Kategori */}
      <section id="kategori" className="container mx-auto p-8 bg-gray-50 mt-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Kategori Kuis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Matematika</h3>
            <p className="text-sm text-gray-600">Uji kemampuan berhitung dan logika Anda.</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">IPA</h3>
            <p className="text-sm text-gray-600">Pelajari sains dengan cara yang menyenangkan.</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Bahasa Inggris</h3>
            <p className="text-sm text-gray-600">Asah kemampuan bahasa Inggris Anda.</p>
          </div>
        </div>
      </section>

      {/* Section Tentang */}
      <section id="tentang" className="container mx-auto p-8 bg-white mt-10 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Tentang QuizApp</h2>
        <p className="text-gray-700">
          QuizApp adalah platform pembelajaran interaktif yang dirancang untuk membantu
          siswa mengasah kemampuan mereka di berbagai bidang seperti Matematika, IPA,
          dan Bahasa Inggris. Semua kuis disusun secara khusus untuk memberikan
          pengalaman belajar yang menyenangkan.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-10">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} QuizApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
