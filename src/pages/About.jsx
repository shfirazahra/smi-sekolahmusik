import React from 'react';

export default function About() {
  return (
    <div className="animate-fade-in py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
            Profil Perusahaan
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">PT. Sinergi Mandiricipta Indonesia</h1>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Pusat Sekolah Musik Terlengkap di Kota Semarang
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-md mb-12">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
              Komitmen Kami dalam dunia pendidikan musik di Indonesia
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
             Sekolah Musik Indonesia (SMI), yang dikembangkan dan dikelola oleh PT Sinergi Mandiricipta Indonesia, adalah lembaga kursus pendidikan musik non-formal terdepan yang memadukan keindahan seni musik dengan kecanggihan teknologi digital.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Menjadi institusi pendidikan musik berbasis teknologi yang unggul, inspiratif, dan terdepan dalam mencetak generasi baru Indonesia yang kreatif, kompetitif, serta berwawasan global.
            </p>
            <div className="pt-3 grid grid-cols-2 gap-4 border-t border-slate-100">
              <div>
                <h4 className="text-lg font-black text-indigo-600">Semarang Barat</h4>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Lokasi Utama</p>
              </div>
              <div>
                <h4 className="text-lg font-black text-indigo-600">100% Jaminan Uang Kembali</h4>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Jaminan Les Musik</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80" 
                alt="Studio VIP" 
                className="w-full h-48 sm:h-64 object-cover" 
              />
            </div>
            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" 
                alt="Pro Audio" 
                className="w-full h-48 sm:h-64 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}