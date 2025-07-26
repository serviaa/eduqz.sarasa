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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 font-sans">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 flex items-center justify-center gap-2"
        >
          sarasa learn <span className="text-5xl">✨</span>
        </motion.h1>

        {/* QUOTE TANPA TANDA PETIK */}
        <motion.figure
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white border border-neutral-300 rounded-xl shadow-md px-8 py-6 mb-8 max-w-2xl mx-auto text-left relative"
        >
          <blockquote className="text-neutral-800 italic text-lg md:text-xl leading-relaxed relative">
            Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.
          </blockquote>
          <footer className="mt-4 text-right text-neutral-800 font-semibold">
            – Najwa Shihab
          </footer>
        </motion.figure>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg text-neutral-700 mb-8 font-medium"
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
              className="bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 py-8 px-6 rounded-2xl shadow-md hover:shadow-lg text-center transition-all flex flex-col items-center gap-2 hover:scale-105"
            >
              <Image
                src={cat.img}
                alt={cat.label}
                width={140}
                height={80}
                className="mb-4 rounded-[2rem] aspect-[2/1] object-cover border-4 border-neutral-100 shadow-sm"
              />
              <span className="mt-2 text-xl font-bold">{cat.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="bg-white border border-neutral-200 rounded-xl p-6 shadow-md text-center max-w-xl mx-auto"
        >
          <h2 className="text-xl font-bold text-neutral-800 mb-4">
            Kenapa belajar di sini?
          </h2>
          <ul className="list-disc list-inside text-neutral-700 text-left mx-auto max-w-md space-y-2">
            <li>Penjelasan setiap jawaban sehingga mudah dipahami</li>
            <li>Tampilan menarik dan mudah digunakan</li>
            <li>Belajar jadi lebih seru dan menyenangkan!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}