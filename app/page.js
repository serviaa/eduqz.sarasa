'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Navbar Component
function Navbar() {
  return (
    <nav className="w-full sticky top-0 left-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <span className="text-2xl">📝</span> eduqz.sarasa
      </Link>
      {/* Menu */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-neutral-700 hover:text-blue-600 font-medium transition">Home</a>
        <a href="#kategori" className="text-neutral-700 hover:text-blue-600 font-medium transition">Kategori</a>
        <a href="#tentang" className="text-neutral-700 hover:text-blue-600 font-medium transition">Tentang</a>
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-4 px-6 text-center text-neutral-500 text-sm mt-12">
      © {new Date().getFullYear()} eduqz.sarasa &middot; Dibuat dengan ❤️ untuk belajar
    </footer>
  );
}

const categories = [
  { key: 'matematika', label: 'MATH' },
  { key: 'english', label: 'ENGLISH' },
  { key: 'ipa', label: 'SCIENCE' },
  { key: 'bahasa_indonesia', label: 'INDONESIA' },
  { key: 'bahasa_jepang', label: 'JEPANG'},
  { key: 'sejarah', label: 'HISTORY' },
  { key: 'pancasila', label: 'PANCASILA' },
  { key: 'bahasa_jawa', label: 'JAWA' },
];

export default function HomePage() {
  // Smooth scroll ke tengah viewport untuk anchor links
  React.useEffect(() => {
    const handleAnchorClick = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        const el = document.querySelector(e.target.hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 flex items-center justify-center gap-2"
          >
            sarasa learn <span className="text-5xl">✨</span>
          </motion.h1>

          {/* QUOTE */}
          <motion.figure
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="bg-white/80 border border-blue-200 rounded-xl shadow-lg px-8 py-6 mb-8 max-w-2xl mx-auto text-center relative"
          >
            <blockquote className="text-blue-800 italic text-lg md:text-xl leading-relaxed">
              Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.
            </blockquote>
            <footer className="mt-6 text-right text-blue-600 font-semibold">
              – Najwa Shihab
            </footer>
          </motion.figure>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg text-blue-700 mb-8 font-medium"
          >
            Pilih kategori kuis untuk mulai belajar:
          </motion.p>

          {/* Kategori Section tanpa gambar */}
          <motion.div
            id="kategori"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-3 mb-12"
            style={{ scrollMarginTop: '100px' }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/${cat.key}`}
                className="bg-white border border-blue-200 hover:border-blue-500 text-blue-800 py-6 px-4 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all flex items-center justify-center hover:scale-105 focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <span className="text-xl font-bold tracking-wide">{cat.label}</span>
              </Link>
            ))}
          </motion.div>

          {/* Tentang Section */}
          <motion.div
            id="tentang"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="bg-white/90 border border-blue-100 rounded-xl p-6 shadow text-center max-w-xl mx-auto"
            style={{ scrollMarginTop: '100px' }}
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
      </main>
      <Footer />
    </div>
  );
}
