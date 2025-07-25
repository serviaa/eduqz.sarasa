'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 font-sans">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          eduqz.sarasa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base md:text-lg text-gray-600 italic mb-2"
        >
          &quot;Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.&quot;
        </motion.p>
        <p className="text-gray-500 font-semibold mb-8">- Najwa Shihab</p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg text-gray-700 mb-8 font-medium"
        >
          Pilih kategori kuis untuk mulai belajar:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-3 mb-12"
        >
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/${cat.key}`}
              className="bg-white border border-gray-200 hover:border-blue-400 text-gray-800 py-8 px-6 rounded-lg shadow-sm hover:shadow-md text-center transition-all flex flex-col items-center gap-2 hover:scale-105"
            >
              <Image
                src={cat.img}
                alt={cat.label}
                width={80}
                height={80}
                className="mb-2"
              />
              <span className="mt-2 text-lg font-semibold">{cat.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center max-w-xl mx-auto"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Kenapa belajar di sini?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-left mx-auto max-w-md space-y-2">
            <li>Penjelasan setiap jawaban sehingga mudah dipahami</li>
            <li>Tampilan menarik dan mudah digunakan</li>
            <li>Belajar jadi lebih seru dan menyenangkan!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}