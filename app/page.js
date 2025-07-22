'use client';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    key: 'matematika',
    label: 'MATH',
    img: '/images/matematika.jpg',
  },
  {
    key: 'english',
    label: 'ENGLISH',
    img: '/images/english.jpeg',
  },
  {
    key: 'ipa',
    label: 'SCIENCE',
    img: '/images/ipa.jpg',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Soft Blur Blue Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-blue-200 opacity-40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 opacity-30 blur-2xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-blue-100 opacity-30 blur-2xl rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white opacity-20 blur-2xl rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center drop-shadow-lg flex items-center justify-center gap-2">
          <span>eduqz.sarasa</span>
          <span className="text-5xl">🎓</span>
        </h1>
        <p className="text-lg text-blue-700 mb-2 text-center italic">
          &quot;Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.&quot; <br />
          <span className="text-blue-500 font-semibold">- Najwa Shihab</span>
        </p>
        <p className="text-lg text-blue-700 mb-8 text-center font-medium">Pilih kategori kuis untuk mulai belajar:</p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 mb-8">
          {categories.map((cat) => (
            <Link key={cat.key} href={`/${cat.key}`} className="bg-white/80 backdrop-blur-md border border-blue-100 hover:border-blue-400 text-blue-800 font-semibold py-6 px-6 rounded-xl shadow-lg hover:bg-blue-50 text-center transition-all flex flex-col items-center gap-2 hover:scale-105">
              <Image src={cat.img} alt={cat.label} width={80} height={80} className="mb-2 rounded-full border-2 border-blue-200 shadow" />
              <span className="mt-2 text-lg font-bold">{cat.label}</span>
            </Link>
          ))}
        </div>
        {/* Motivational Section */}
        <div className="bg-white/60 backdrop-blur-md border border-blue-100 rounded-xl p-4 shadow text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Kenapa belajar di sini?</h2>
          <ul className="list-disc list-inside text-blue-700 text-left mx-auto max-w-md">
            <li>Penjelasan setiap jawaban sehingga mudah dipahami</li>
            <li>Tampilan menarik dan mudah digunakan</li>
            <li>Belajar jadi lebih seru dan menyenangkan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}