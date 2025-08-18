'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from "@/lib/supabaseClient";

// Navbar Component
function Navbar() {
  return (
    <nav className="w-full sticky top-0 left-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm py-3 px-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <span className="text-2xl">📝</span> eduqz.sarasa
      </Link>
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
  { key: 'bahasa_indonesia', label: 'INDONESIA' }
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

  // State untuk nama dan loading
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handler submit nama
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name.trim()) {
    alert("Nama wajib diisi");
    return;
  }

  setLoading(true);
  try {
    // kolom di DB = `nama`, nilai dari state = `name`
    const { data, error } = await supabase
      .from("users")
      .insert([{ nama: name }])
      .select("id_user, nama")      // ambil kolom yang diperlukan saja
      .single();

    if (error) throw error;

    // simpan id_user (sesuaikan dengan PK tabelmu)
    localStorage.setItem("userId", String(data.id_user));
    localStorage.setItem("nama", data.nama);
    setIsNameEntered(true);
  } catch (err) {
    console.error("Supabase insert error:", err);
    alert("Gagal menyimpan nama: " + (err?.message || err));
  } finally {
    setLoading(false); // pastikan loading selalu dimatikan
  }
};


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
            <blockquote className="text-blue-800 italic text-lg md:text-xl leading-relaxed relative">
              <span className="text-3xl text-blue-400 font-serif absolute left-0 -top-2 select-none">“</span>
              Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa pendidikan Indonesia tak mungkin bertahan.
              <span className="text-3xl text-blue-400 font-serif absolute right-0 -bottom-2 select-none">”</span>
            </blockquote>
            <footer className="mt-6 text-right text-blue-600 font-semibold">
              – Najwa Shihab
            </footer>
          </motion.figure>

          {/* Nama Input Section */}
          {!isNameEntered ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-auto mb-8"
            >
              <h1 className="text-xl font-bold mb-4">Masukkan Nama Anda</h1>
              <input
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border w-full p-2 rounded-lg mb-4"
                disabled={loading}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Mulai"}
              </button>
            </form>
          ) : (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Halo, {name}!</h2>
              <p className="mt-2 text-blue-700">
                Silakan pilih kategori kuis di bawah ini 🚀
              </p>
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg text-blue-700 mb-8 font-medium"
          >
            Pilih kategori kuis untuk mulai belajar:
          </motion.p>

          {/* Kategori Section */}
          <motion.div
            id="kategori"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-12 justify-center"
          >
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={isNameEntered ? `/${cat.key}` : "#"}
                className={`bg-white border border-blue-200 hover:border-blue-500 text-blue-800 py-3 px-2 rounded-xl shadow hover:shadow-lg text-center transition-all flex items-center justify-center hover:scale-105 focus:ring-2 focus:ring-blue-300 outline-none text-base font-bold
                  ${!isNameEntered ? "opacity-50 pointer-events-none" : ""}`}
                style={{ minWidth: 0 }}
              >
                <span>{cat.label}</span>
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