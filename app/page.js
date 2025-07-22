'use client';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    key: 'matematika',
    img: '/images/matematika.jpg', // Simpan gambar di public/images/
  },
  {
    key: 'english',
    img: '/images/english.jpeg',
  },
  {
    key: 'ipa',
    img: '/images/ipa.jpg',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>

      <h1 className="text-4xl font-bold text-pink-600 mb-4 text-center drop-shadow-lg flex items-center gap-2">
        <span>eduqz.sarasa</span>
        <span className="text-5xl">🎓</span>
      </h1>
      <p className="text-lg text-pink-700 mb-2 text-center italic">
        &quot;Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.&quot; <br />
        <span className="text-pink-500 font-semibold">- Najwa Shihab</span>
      </p>
      <p className="text-lg text-pink-700 mb-8 text-center font-medium">Pilih kategori kuis untuk mulai belajar:</p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 mb-8">
        {categories.map((cat) => (
          <Link key={cat.key} href={`/${cat.key}`} className="bg-white/80 border border-pink-200 hover:border-pink-400 text-pink-800 font-semibold py-6 px-6 rounded-xl shadow-lg hover:bg-pink-100 text-center transition-all flex flex-col items-center gap-2 hover:scale-105">
            <Image src={cat.img} alt={cat.label} width={80} height={80} className="mb-2 rounded-full border-2 border-pink-300 shadow" />
            <span className="mt-2 text-lg font-bold">{cat.label}</span>
          </Link>
        ))}
      </div>
      {/* Motivational Section */}
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 shadow text-center max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-pink-600 mb-2">Kenapa belajar di sini?</h2>
        <ul className="list-disc list-inside text-pink-700 text-left mx-auto max-w-md">
          <li>Penjelasan singkat setiap jawaban sehingga mudah dipahami</li>
          <li>Tampilan menarik dan mudah digunakan</li>
          <li>Belajar jadi lebih seru dan menyenangkan!</li>
        </ul>
      </div>
    </div>
  );
}