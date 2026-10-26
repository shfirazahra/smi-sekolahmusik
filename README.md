# Sekolah Musik — Prototipe Front-End SMI

Aplikasi web untuk coding test Front-End Engineer. Website Sekolah Musik dengan katalog program pembelajaran, alur pendaftaran demo, manajemen katalog & presensi untuk admin, serta sistem multi-role pengguna.

## Deskripsi Aplikasi

- **Autentikasi & Multi-Role**:
  - **Registrasi & Login**: Form registrasi untuk pendaftaran pengguna baru (role `user` secara otomatis) dan form login.
  - **Sistem Role (Admin vs User)**:
    - **User (Siswa/Pengunjung)**: Diberikan akses ke halaman **Katalog Kelas**, **Form Pendaftaran/Pemesanan**, dan halaman **Pendaftaran Saya** untuk melihat riwayat pesanan.
    - **Admin (Pengelola)**: Mengakses **Panel Presensi/Kehadiran** (melihat, mencatat, dan mengonfirmasi kehadiran) serta **Panel Kelola Katalog** (menambah, mengedit, dan menghapus kelas). Admin dibatasi dari halaman/fitur pemesanan kelas.
  - Autentikasi disimulasikan menggunakan `localStorage` untuk menyimpan akun terdaftar dan session aktif.
- **Alur Akses Navigasi**:
  - Beranda, Tentang Kami, Katalog, dan Detail dapat dibuka tanpa login.
  - Halaman **Pendaftaran Saya** hanya muncul di navbar saat masuk sebagai **User**.
  - Halaman **Presensi (Admin)** hanya muncul di navbar saat masuk sebagai **Admin**.
  - Akses fitur pemesanan oleh pengunjung tanpa login akan mengarahkan pengguna ke halaman login/registrasi terlebih dahulu.
- **Katalog Kelas & Pengelolaan Katalog**:
  - Data kelas diambil dari dataset buatan sendiri (`public/data/catalog.json`) dengan `fetch`.
  - **Tampilan User**: Pencarian, filter kategori, detail kelas, serta pendaftaran kelas/pemesanan.
  - **Tampilan Admin**: Tombol pemesanan digantikan dengan aksi **Edit** dan **Hapus**, serta tombol **+ Tambah Kelas Baru** untuk menambah program baru ke katalog.
- **Tim Kami**: Data diambil dari API [DummyJSON](https://dummyjson.com/docs) (`/users`) dan ditampilkan di Beranda.
- **Dashboard Kehadiran (Akses Admin)**:
  - Ringkasan total catatan, tingkat kehadiran murid, alpa, izin/sakit, serta grafik presentasi status kehadiran.
  - **Fitur Catat Kehadiran Baru**: Form input bagi Admin untuk mencatat konfirmasi kehadiran siswa secara langsung.
  - Filter riwayat kehadiran berdasarkan rentang tanggal, status, serta pencarian nama/email.
- **Pendaftaran Saya**: Daftar pemesanan/pendaftaran kelas yang dibuat oleh User selama sesi berjalan.
- **Penanganan State**: State **loading**, **error** (dengan tombol coba lagi), **data kosong**, dan **data invalid** ditangani dengan konsisten menggunakan `AsyncBoundary`.

**Akun Demo Bawaan:**
- **Admin**: `admin@smi.co.id` / `smi12345`
- **User Baru**: Dapat langsung mendaftar via form registrasi di halaman Login.

## Cara Menjalankan

Prasyarat: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (`http://localhost:5173`).

Build produksi: `npm run build`

## Bahasa Pemrograman dan Tools

- JavaScript (JSX) dengan React 19
- Vite sebagai build tool
- Tailwind CSS v3 (via PostCSS) untuk styling
- Fetch API untuk integrasi REST
- Oxlint untuk linting (`npm run lint`)
- Git untuk version control

## Struktur Folder

```
src/
  components/   Komponen reusable (ItemCard, AsyncBoundary, Loading, ErrorMessage, EmptyState, StatCard, StatusBadge, FilterField, StudentAttendanceTable, PersonalAttendance, BookingModal, Toast, Navbar, Footer)
  hooks/        Logika data dan state: useData, useAttendance, useAuth, useCatalogFilter, useOrders, useToast, useContactForm
  pages/        Login (Login & Register), Home, About, Catalog (User & Admin Manage), ItemDetail, Orders, Contact, Attendance (Admin)
  services/     api.js (fetch) dan auth.js (login, registrasi, multi-role session)
  utils/        format.js (rupiah, normalisasi data), date.js (format tanggal), attendance.js (hitung, filter, ringkasan kehadiran)
  data/         Teks testimoni statis
public/data/    catalog.json (dataset lokal)
```

## Keputusan Teknis

- **Penerapan Multi-Role (RBAC)**: Pemisahan hak akses antara `admin` dan `user` dilakukan pada level komponen dan navigasi (`Navbar`, `App.jsx`, `Catalog`, `ItemDetail`, `Home`).
- **Autentikasi Terintegrasi**: Fitur registrasi menyimpan data pengguna baru di `localStorage` bersama akun bawaan admin, lalu membuat sesi login otomatis setelah pendaftaran.
- **Pengolahan Data & Modul**: Pengambilan data dipisah dari UI melalui `services`, `utils`, dan custom hook.
- Navigasi antar halaman menggunakan state internal tanpa routing eksternal untuk menjaga kesederhanaan prototipe.

## Catatan Penting untuk Penilaian

- Data pengguna terdaftar, status kehadiran, dan penambahan katalog disimpan secara lokal (*frontend simulation*) melalui `localStorage` dan state React.
- Data profil contoh diambil dari API DummyJSON sebagai representasi data pengguna demo.