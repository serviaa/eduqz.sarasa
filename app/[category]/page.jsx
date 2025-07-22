'use client';
import QuizPage from '../components/QuizPage';
import { quizData } from '../data/quizData';

export default function CategoryPage({ params }) {
  const { category } = params;
  const questions = quizData[category];

  return (
    <QuizPage questions={questions} category={category} />
  );
}
