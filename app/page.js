'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">📚 Selamat Datang di Kuis eduqz.sarasa</h1>
      <p className="text-lg text-pink-700 mb-6 text-center">Pilih kategori kuis untuk mulai belajar:</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        {['matematika', 'bahasa-indonesia', 'ipa'].map((cat) => (
          <Link key={cat} href={`/${cat}`} className="bg-pink-200 text-pink-800 font-semibold py-4 px-6 rounded-xl shadow hover:bg-pink-300 text-center transition-all">
            {cat.replace('-', ' ').toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
