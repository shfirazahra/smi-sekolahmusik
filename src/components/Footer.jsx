import React from 'react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 mt-auto w-full px-6 sm:px-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-indigo-600 text-white p-2 rounded-xl font-black text-xs">SM</div>
            <h3 className="text-white text-sm font-black uppercase tracking-wider">Sekolah Musik</h3>
          </div>
          <p className="leading-relaxed max-w-md text-slate-400">
            Program belajar musik untuk membantu siswa mengenal instrumen, mengembangkan keterampilan, dan mengekspresikan kreativitas. 
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Alamat Kantor</h4>
          <p className="leading-relaxed text-slate-400">
            Jl. Anjasmoro Raya No.21 Blok E1<br />
            Tawangsari, Semarang Barat, Kota Semarang 50144
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Navigasi Utama</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setCurrentView('home')} className="hover:text-indigo-400 transition">Beranda</button></li>
            <li><button onClick={() => setCurrentView('about')} className="hover:text-indigo-400 transition">Tentang Kami</button></li>
            <li><button onClick={() => setCurrentView('catalog')} className="hover:text-indigo-400 transition">Katalog Kelas</button></li>
            <li><button onClick={() => setCurrentView('contact')} className="hover:text-indigo-400 transition">Hubungi Kami</button></li>
          </ul>
        </div>
      </div>
      <div className="w-full mt-12 pt-8 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>&copy; {CURRENT_YEAR} PT. Sinergi Mandiricipta Indonesia.</p>
        <p>Prototipe Sistem Front-End Development</p>
      </div>
    </footer>
  );
}