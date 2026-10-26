import React from 'react';
import ItemCard from '../components/ItemCard';
import MemberCard from '../components/MemberCard';
import AsyncBoundary from '../components/AsyncBoundary';

export default function Home({ catalog, team, setCurrentView, handleOpenDetail, onBook, testimonials }) {
  const featuredItems = catalog.data.filter((item) => item.featured);
  return (
    <div className="animate-fade-in w-full bg-white">
      {/* HERO SECTION DENGAN BACKGROUND GAMBAR TEMA LIGHT & ELEGAN */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center text-center px-6 py-20 overflow-hidden border-b border-slate-100">
        
        {/* GAMBAR BACKGROUND + OVERLAY PUTIH TERANG */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
            alt="Suasana belajar dan berlatih musik" 
            className="w-full h-full object-cover scale-105" 
          />
          {/* Overlay Putih Soft & Gradien Terang */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-50/85 to-white backdrop-blur-[2px]"></div>
        </div>

        {/* KONTEN HERO */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            Sekolah Musik • Belajar, Berkarya, Berprestasi
          </span>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight drop-shadow-sm">
            Temukan Irama dan <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Kembangkan Bakat Musikmu
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Mulai perjalanan musikmu bersama program belajar yang dirancang untuk pemula hingga tingkat lanjutan. Temukan kelas, kenali instrumen, dan bangun kepercayaan diri dalam bermusik.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentView('catalog')} 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-9 py-4 rounded-full font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-105 transition duration-300"
            >
              Jelajahi Kelas Musik
            </button>
            <button 
              onClick={() => setCurrentView('about')} 
              className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-800 border border-slate-200 px-9 py-4 rounded-full font-bold text-sm shadow-md backdrop-blur-md transition duration-300"
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section>

      {/* SEKSI REKOMENDASI UNGGULAN */}
      <section className="py-20 sm:py-24 bg-slate-50/70 w-full border-b border-slate-100">
        <div className="w-full px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-lg border border-indigo-100">
              Program Pilihan
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 mb-3">Kelas Musik Unggulan</h2>
            <p className="text-slate-600 text-sm">Pilih program belajar yang sesuai dengan minat dan tujuan bermusikmu.</p>
          </div>

          <div className="mb-12">
            <AsyncBoundary
              loading={catalog.loading}
              error={catalog.error}
              onRetry={catalog.retry}
              isEmpty={featuredItems.length === 0}
              emptyTitle="Belum ada rekomendasi"
              emptyHint="Jelajahi semua program kelas musik yang tersedia."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item) => (
                  <ItemCard key={item.id} item={item} large onDetail={handleOpenDetail} onBook={onBook} />
                ))}
              </div>
            </AsyncBoundary>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setCurrentView('catalog')}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition duration-300 shadow-md"
            >
              Lihat Semua Kelas →
            </button>
          </div>
        </div>
      </section>

     
      {/* TESTIMONI CLEAN LIGHT */}
      <section className="py-20 sm:py-24 bg-white w-full">
        <div className="w-full px-6 sm:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
              Cerita Belajar (Contoh Demo)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">Pengalaman Belajar Musik</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testi => (
              <div key={testi.id} className="bg-slate-50/80 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <p className="text-slate-600 mb-6 leading-relaxed italic text-xs sm:text-sm">"{testi.text}"</p>
                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    {testi.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{testi.name}</h4>
                    <p className="text-xs text-indigo-600 font-medium">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}