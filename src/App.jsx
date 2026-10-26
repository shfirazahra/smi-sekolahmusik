import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import ItemDetail from "./pages/ItemDetail";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import { testimonials } from "./data/testimonials";
import { useCatalog, useTeam } from "./hooks/useData";
import { useCatalogFilter } from "./hooks/useCatalogFilter";
import { useOrders } from "./hooks/useOrders";
import { useToast } from "./hooks/useToast";
import { useContactForm } from "./hooks/useContactForm";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingItem, setBookingItem] = useState(null);
  const [pending, setPending] = useState(null);

  const { session, signIn, signOut } = useAuth();
  const catalog = useCatalog();
  const team = useTeam(30);
  const filter = useCatalogFilter(catalog.data);
  const { orders, addOrder, clearOrders } = useOrders();
  const toast = useToast();
  const contact = useContactForm(toast.show);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goToLogin = (nextPending = null) => {
    setPending(nextPending);
    setCurrentView("login");
    scrollTop();
  };

  const navigate = (view) => {
    // Proteksi halaman Pesanan & Kehadiran
    if ((view === "orders" || view === "attendance") && !session) {
      return goToLogin({ view });
    }

    // Hanya Admin yang diizinkan mengakses halaman presensi
    if (view === "attendance" && session?.role !== "admin") {
      toast.show("Akses ditolak: Halaman presensi hanya untuk Admin.");
      return;
    }

    setCurrentView(view);
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setCurrentView("detail");
    scrollTop();
  };

  const requestBooking = (item) => {
    if (!session) return goToLogin({ view: currentView, bookItem: item });
    setBookingItem(item);
  };

  const handleLoginSuccess = (newSession) => {
    signIn(newSession);
    const targetView = pending?.view ?? (newSession.role === "admin" ? "attendance" : "home");
    setCurrentView(targetView);

    if (pending?.bookItem) setBookingItem(pending.bookItem);
    setPending(null);
    toast.show(`Selamat datang, ${newSession.name}!`);
  };

  const handleLoginCancel = () => {
    const back = pending?.view && !["orders", "attendance"].includes(pending.view) ? pending.view : "home";
    setCurrentView(back);
    setPending(null);
  };

  const handleLogout = () => {
    signOut();
    clearOrders();
    if (currentView === "orders" || currentView === "attendance") setCurrentView("home");
    toast.show("Anda telah keluar.");
  };

  const handleBookingConfirm = (details) => {
    addOrder(bookingItem, details);
    setBookingItem(null);
    toast.show("Pendaftaran kelas berhasil disimpan!");
  };

  const loginNotice = pending?.bookItem
    ? `Masuk atau daftar untuk menyewa/mendaftar ${pending.bookItem.name}.`
    : pending?.view === "orders"
      ? "Masuk untuk melihat pendaftaran Anda."
      : "";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col scroll-smooth antialiased w-full overflow-x-hidden">
      <Navbar
        currentView={currentView}
        setCurrentView={navigate}
        orderCount={orders.length}
        session={session}
        onLogin={() => goToLogin()}
        onLogout={handleLogout}
      />

      <main className="flex-grow w-full">
       {currentView === "home" && (
  <Home
    catalog={catalog}
    team={team}
    setCurrentView={navigate}
    handleOpenDetail={handleOpenDetail}
    onBook={requestBooking}
    testimonials={testimonials}
    session={session}
  />
)}
        {currentView === "about" && <About />}
        {currentView === "attendance" && session?.role === "admin" && (
          <Attendance team={team} />
        )}
        {currentView === "catalog" && (
  <Catalog
    catalog={catalog}
    filter={filter}
    handleOpenDetail={handleOpenDetail}
    onBook={requestBooking}
    session={session} // <--- Kirimkan session ke Catalog
  />
)}
       {currentView === "detail" && selectedItem && (
  <ItemDetail
    item={selectedItem}
    onBack={() => setCurrentView("catalog")}
    onBook={requestBooking}
    session={session} // <--- Tambahkan prop session di sini
  />
)}
        {currentView === "orders" && (
          <Orders orders={orders} onGoCatalog={() => setCurrentView("catalog")} />
        )}
        {currentView === "contact" && (
          <Contact handleContactSubmit={contact.submit} contactSubmitted={contact.submitted} />
        )}
        {currentView === "login" && (
          <Login notice={loginNotice} onSuccess={handleLoginSuccess} onCancel={handleLoginCancel} />
        )}
      </main>

      <Footer setCurrentView={navigate} />

      {bookingItem && (
        <BookingModal
          item={bookingItem}
          onClose={() => setBookingItem(null)}
          onConfirm={handleBookingConfirm}
        />
      )}
      <Toast message={toast.message} />
    </div>
  );
}