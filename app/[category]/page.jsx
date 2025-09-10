'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuizPage from '../components/QuizPage';

export default function CategoryPage() {
  const { category } = useParams(); // ✅ ambil params langsung di client
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    fetch('/api/quiz')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch quiz data');
        return res.json();
      })
      .then(data => {
        if (data[category]) {
          setQuestions(data[category]);
        } else {
          setQuestions([]);
          setError('Kategori tidak ditemukan');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Loading soal...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!questions || questions.length === 0) return <p>Soal tidak tersedia untuk kategori ini.</p>;

  return <QuizPage questions={questions} category={category} />;
}
