'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  { key: 'matematika', label: 'MATH', img: '/images/matematika.jpg' },
  { key: 'english', label: 'ENGLISH', img: '/images/english.jpeg' },
  { key: 'ipa', label: 'SCIENCE', img: '/images/ipa.jpg' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 flex items-center justify-center gap-2"
        >
          eduqz.sarasa <span className="text-5xl">🎓</span>
        </motion.h1>

        {/* Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="bg-white/70 border-l-4 border-blue-400 rounded-xl shadow px-6 py-4 mb-6 max-w-2xl mx-auto flex items-start gap-3">
            <span className="text-3xl text-blue-400 font-serif select-none">“</span>
            <div>
              <p className="text-blue-700 italic text-base md:text-lg">
                Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.
              </p>
              <p className="text-blue-500 font-semibold mt-2 text-right">- Najwa Shihab</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg text-blue-700 mb-8 font-medium"
        >
          Pilih kategori kuis untuk mulai belajar:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-3 mb-12"
        >
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/${cat.key}`}
              className="bg-white border border-blue-200 hover:border-blue-400 text-blue-800 py-8 px-6 rounded-2xl shadow-lg hover:shadow-xl text-center transition-all flex flex-col items-center gap-2 hover:scale-105"
            >
              <Image
                src={cat.img}
                alt={cat.label}
                width={140}
                height={80}
                className="mb-4 rounded-[2.5rem] aspect-[2/1] object-cover border-4 border-blue-100 shadow"
              />
              <span className="mt-2 text-xl font-bold">{cat.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="bg-white/80 border border-blue-100 rounded-xl p-6 shadow text-center max-w-xl mx-auto"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            Kenapa belajar di sini?
          </h2>
          <ul className="list-disc list-inside text-blue-700 text-left mx-auto max-w-md space-y-2">
            <li>Penjelasan setiap jawaban sehingga mudah dipahami</li>
            <li>Tampilan menarik dan mudah digunakan</li>
            <li>Belajar jadi lebih seru dan menyenangkan!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}