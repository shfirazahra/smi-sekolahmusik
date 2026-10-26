import { useState } from "react";

export default function Navbar({
  currentView,
  setCurrentView,
  orderCount,
  session,
  onLogin,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = session?.role === "admin";
  const isUser = session?.role === "user";

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Otomatis tutup menu mobile saat diklik
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & Brand */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 text-left"
        >
          <div className="rounded-xl bg-indigo-600 px-2.5 py-1.5 text-sm font-black text-white">
            SM
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">Sekolah Musik</p>
            <p className="text-[10px] text-slate-500">PT SMI</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <button
            onClick={() => handleNavClick("home")}
            className={currentView === "home" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Beranda
          </button>

          <button
            onClick={() => handleNavClick("catalog")}
            className={currentView === "catalog" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            {isAdmin ? "Kelola Katalog" : "Katalog Kelas"}
          </button>

          {isUser && (
            <button
              onClick={() => handleNavClick("orders")}
              className={`relative ${currentView === "orders" ? "text-indigo-600" : "hover:text-slate-900"}`}
            >
              Pendaftaran Saya
              {orderCount > 0 && (
                <span className="ml-1.5 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {orderCount}
                </span>
              )}
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => handleNavClick("attendance")}
              className={`rounded-lg px-2.5 py-1 ${
                currentView === "attendance"
                  ? "bg-indigo-50 text-indigo-700 font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Presensi
            </button>
          )}

          <button
            onClick={() => handleNavClick("about")}
            className={currentView === "about" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Tentang
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className={currentView === "contact" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Kontak
          </button>
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-block text-xs text-slate-600">
                <strong>{session.name}</strong> ({session.role || "user"})
              </span>
              <button
                onClick={onLogout}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition sm:px-3.5 sm:py-2"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition sm:px-4 sm:py-2"
            >
              Masuk / Daftar
            </button>
          )}

          {/* Tombol Hamburger (Khusus Layar HP) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              /* Icon X (Tutup) */
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Icon Hamburger */
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {session && (
            <div className="mb-3 border-b border-slate-100 pb-2 text-xs text-slate-600 sm:hidden">
              Masuk sebagai: <strong>{session.name}</strong> ({session.role || "user"})
            </div>
          )}
          <div className="flex flex-col gap-2 text-sm font-bold text-slate-600">
            <button
              onClick={() => handleNavClick("home")}
              className={`rounded-lg px-3 py-2 text-left ${currentView === "home" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
            >
              Beranda
            </button>

            <button
              onClick={() => handleNavClick("catalog")}
              className={`rounded-lg px-3 py-2 text-left ${currentView === "catalog" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
            >
              {isAdmin ? "Kelola Katalog" : "Katalog Kelas"}
            </button>

            {isUser && (
              <button
                onClick={() => handleNavClick("orders")}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-left ${currentView === "orders" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
              >
                <span>Pesanan</span>
                {orderCount > 0 && (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {orderCount}
                  </span>
                )}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => handleNavClick("attendance")}
                className={`rounded-lg px-3 py-2 text-left ${currentView === "attendance" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
              >
                Presensi
              </button>
            )}

            <button
              onClick={() => handleNavClick("about")}
              className={`rounded-lg px-3 py-2 text-left ${currentView === "about" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
            >
              Tentang
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`rounded-lg px-3 py-2 text-left ${currentView === "contact" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50"}`}
            >
              Kontak
            </button>
          </div>
        </div>
      )}
    </header>
  );
}