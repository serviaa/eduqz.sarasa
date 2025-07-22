'use client';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    key: 'matematika',
    img: '/images/matematika.jpg', // Pastikan file gambar ada di public/images/
  },
  {
    key: 'english',
    img: '/images/english.jpg',
  },
  {
    key: 'ipa',
    img: '/images/ipa.jpg',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">📚 Selamat Datang di Kuis eduqz.sarasa</h1>
      <p className="text-lg text-pink-700 mb-6 text-center">Pilih kategori kuis untuk mulai belajar:</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.key} href={`/${cat.key}`} className="bg-pink-200 text-pink-800 font-semibold py-4 px-6 rounded-xl shadow hover:bg-pink-300 text-center transition-all flex flex-col items-center">
            <Image src={cat.img} alt={cat.label} width={80} height={80} className="mb-2" />
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}