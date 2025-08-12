import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ...Navbar, Footer, categories...

export default function HomePage() {
  React.useEffect(() => {
    const handleAnchorClick = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        const el = document.querySelector(e.target.hash);
        if (el) {
          e.preventDefault();
          // Scroll ke tengah viewport secara smooth
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
          {/* ...kode lain tetap... */}
          <motion.div
            id="kategori"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-3 mb-12"
            style={{ scrollMarginTop: '100px' }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/${cat.key}`}
                className="bg-white border border-blue-200 hover:border-blue-500 text-blue-800 py-8 px-6 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all flex flex-col items-center gap-2 hover:scale-105 focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  width={140}
                  height={80}
                  className="mb-4 rounded-[2.5rem] aspect-[2/1] object-cover border-4 border-blue-100 shadow"
                />
                <span className="mt-2 text-xl font-bold tracking-wide">{cat.label}</span>
              </Link>
            ))}
          </motion.div>
          {/* ...kode lain tetap... */}
        </div>
      </main>
      <Footer />
    </div>
  );
}