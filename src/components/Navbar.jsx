export default function Navbar({
  currentView,
  setCurrentView,
  orderCount,
  session,
  onLogin,
  onLogout,
}) {
  const isAdmin = session?.role === "admin";
  const isUser = session?.role === "user";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => setCurrentView("home")}
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

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <button
            onClick={() => setCurrentView("home")}
            className={currentView === "home" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Beranda
          </button>

          {/* Katalog Kelas */}
          <button
            onClick={() => setCurrentView("catalog")}
            className={currentView === "catalog" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            {isAdmin ? "Kelola Katalog" : "Katalog Kelas"}
          </button>

          {/* Halaman Pesanan/Pendaftaran HANYA untuk USER */}
          {isUser && (
            <button
              onClick={() => setCurrentView("orders")}
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

          {/* Menu Presensi HANYA untuk ADMIN */}
          {isAdmin && (
            <button
              onClick={() => setCurrentView("attendance")}
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
            onClick={() => setCurrentView("about")}
            className={currentView === "about" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Tentang
          </button>
          <button
            onClick={() => setCurrentView("contact")}
            className={currentView === "contact" ? "text-indigo-600" : "hover:text-slate-900"}
          >
            Kontak
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-slate-600">
                <strong>{session.name}</strong> ({session.role || "user"})
              </span>
              <button
                onClick={onLogout}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
            >
              Masuk / Daftar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}