import React, { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, orderCount, session, onLogin, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md text-slate-800 sticky top-0 z-50 border-b border-slate-100 shadow-sm w-full">
      <div className="w-full px-6 sm:px-12 py-4 flex justify-between items-center">
        
        {/* LOGO CLEAN */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          <div className="bg-indigo-600 text-white p-2.5 rounded-2xl font-black text-lg leading-none shadow-md shadow-indigo-600/20 group-hover:scale-105 transition">
            SM
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-wider uppercase text-slate-900 leading-tight">
              Sekolah Musik
            </h1>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">by Sinergi Mandiricipta Indonesia</p>
          </div>
        </div>

        {/* HAMBURGER BUTTON (MOBILE ONLY) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-50 focus:outline-none transition"
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`px-4 py-2 rounded-full transition ${currentView === 'home' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className={`px-4 py-2 rounded-full transition ${currentView === 'about' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Tentang Kami
          </button>
          <button 
            onClick={() => handleNavClick('catalog')} 
            className={`px-4 py-2 rounded-full transition ${currentView === 'catalog' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Katalog
          </button>
          {session && (
            <>
          <button
            onClick={() => handleNavClick('attendance')}
            className={`px-4 py-2 rounded-full transition ${currentView === 'attendance' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Kehadiran
          </button>
          <button 
            onClick={() => handleNavClick('orders')} 
            className={`px-4 py-2 rounded-full transition relative ${currentView === 'orders' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Pesanan
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {orderCount}
              </span>
            )}
          </button>
            </>
          )}
          
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`ml-2 px-6 py-2.5 rounded-full font-bold transition text-xs uppercase tracking-wider ${currentView === 'contact' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
          >
            Hubungi Kami
          </button>
          {session ? (
            <div className="flex items-center gap-1 pl-2 ml-1 border-l border-slate-200">
              <span
                title={session.email}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white"
              >
                {session.name[0]}
              </span>
              <span className="hidden lg:inline max-w-[8rem] truncate text-xs font-bold text-slate-700">
                {session.name}
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-full text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="px-4 py-2 rounded-full text-slate-700 hover:bg-slate-50 transition"
            >
              Masuk
            </button>
          )}
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-2 animate-fade-in shadow-lg">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${currentView === 'home' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${currentView === 'about' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Tentang Kami
          </button>
          <button 
            onClick={() => handleNavClick('catalog')} 
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${currentView === 'catalog' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Katalog
          </button>
          {session && (
            <>
          <button
            onClick={() => handleNavClick('attendance')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${currentView === 'attendance' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Dashboard Kehadiran
          </button>
          <button 
            onClick={() => handleNavClick('orders')} 
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex justify-between items-center transition ${currentView === 'orders' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span>Pesanan</span>
            {orderCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {orderCount}
              </span>
            )}
          </button>
            </>
          )}
          <div className="pt-2">
            <button 
              onClick={() => handleNavClick('contact')} 
              className={`w-full py-3 rounded-xl font-bold text-center text-xs uppercase tracking-wider transition ${currentView === 'contact' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-indigo-600 border border-indigo-100'}`}
            >
              Hubungi Kami
            </button>
            {session ? (
              <button
                onClick={() => { setIsMenuOpen(false); onLogout(); }}
                className="mt-2 w-full py-3 rounded-xl font-semibold text-center text-sm text-rose-600 hover:bg-rose-50 transition"
              >
                Keluar ({session.name})
              </button>
            ) : (
              <button
                onClick={() => { setIsMenuOpen(false); onLogin(); }}
                className="mt-2 w-full py-3 rounded-xl font-semibold text-center text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}