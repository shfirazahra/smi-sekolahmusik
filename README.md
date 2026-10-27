# 🎵 Sekolah Musik — Instructor Attendance (Front-End Coding Test)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

Aplikasi web Sekolah Musik SMI yang dibuat untuk coding test Front-End. Fitur utama sesuai soal adalah **Web App Instructor Attendance**: instruktur login, lalu memantau kehadiran personal dan kehadiran murid lengkap dengan persentase dan filter riwayat. Aplikasi juga memiliki katalog kelas dan alur pendaftaran kelas sebagai pelengkap.

## Deskripsi Aplikasi

### 1. Halaman Login
- Form login sederhana (email + password) dengan validasi: email wajib & berformat benar, password wajib minimal 6 karakter.
- Autentikasi **disimulasikan** (tanpa back-end): akun bawaan ada di kode, akun hasil registrasi dan sesi disimpan di `localStorage`.
- Ada dua role:
  - **Instruktur** — akun bawaan, masuk ke halaman Presensi dan dapat mengelola katalog.
  - **User** — dibuat lewat form "Daftar di sini"; dapat mendaftar kelas dan melihat "Pendaftaran Kelas".

**Akun demo instruktur:** <mark style="background-color: #fef08a; color: #000;">instruktur@smi.co.id / smi12345</mark>

### 2. Presensi Instruktur (khusus role Instruktur)

> [!NOTE]
> **Melihat attendance personal**  
> 📍 **Lokasi di aplikasi:** Bagian **Kehadiran personal**: kartu ringkasan + tabel riwayat

> [!IMPORTANT]
> **Melihat total absensi murid**  
> 📍 **Lokasi di aplikasi:** Kartu **Total absensi murid** (alpa + izin + sakit, dengan rinciannya)

> [!TIP]
> **Persentase kehadiran murid dan personal**  
> 📍 **Lokasi di aplikasi:** Kartu **Persentase kehadiran murid**, bar **Persentase Kehadiran Murid** per status, serta persentase pada **Kehadiran Personal**

> [!WARNING]
> **Filter history kehadiran personal dan murid**  
> 📍 **Lokasi di aplikasi:** Dua filter yang berdiri sendiri: personal (rentang tanggal + status) dan murid (rentang tanggal + status + cari nama/email)

Catatan perilaku filter:
- Persentase dan total pada ringkasan mengikuti **rentang tanggal** (dan pencarian untuk murid). Filter **status** hanya mempersempit isi tabel, agar persentase kehadiran tidak menjadi 0% atau 100% saat status dipilih.
- Rentang tanggal tidak valid (tanggal awal melewati tanggal akhir) menampilkan pesan, bukan tabel kosong yang membingungkan.
- Form **Catat Kehadiran Hari Ini** (fitur tambahan) mengganti status seorang murid pada hari ini; hasilnya ikut terhitung di ringkasan dan filter. Data ini hanya ada di memori dan hilang saat halaman dimuat ulang.

### 3. Sumber Data
- 🌐 <mark style="background-color: #bae6fd; color: #000; font-weight: bold; padding: 2px 6px;">DummyJSON</mark> (`GET https://dummyjson.com/users?limit=30`) — daftar murid/tim. Dipakai di halaman Presensi dan bagian "Tim Kami" di Beranda.
- 📁 <mark style="background-color: #bae6fd; color: #000; font-weight: bold; padding: 2px 6px;">Dataset buatan sendiri</mark> (`public/data/catalog.json`, di-fetch lewat Fetch API) — katalog kelas musik. Dataset ini melengkapi DummyJSON, sesuai ketentuan soal.
- DummyJSON tidak menyediakan data presensi, sehingga **status kehadiran murid dan instruktur dibuat simulasi** di sisi front-end (pola deterministik dari id murid dan tanggal) lalu diproses (filter, hitung, persentase) dari data tersebut. Ini data contoh, bukan catatan presensi nyata.

### 4. Fitur Pelengkap
- **Katalog Kelas**: cari nama kelas, filter kategori, halaman detail, dan pendaftaran kelas (modal) untuk User. Instruktur melihat tombol Tambah/Edit/Hapus kelas; perubahan hanya di memori dan kembali ke data awal saat halaman dimuat ulang.
- **Pendaftaran Kelas**: riwayat pendaftaran kelas oleh User selama sesi berjalan.
- Beranda, Tentang, dan Kontak.

### 🛡️ Penanganan State
- **Loading**, **error** (dengan tombol *Coba lagi*), dan **data kosong** ditangani seragam oleh komponen <mark style="background-color: #fef08a; color: #000;">AsyncBoundary</mark>.
- **Data invalid**: item/murid tanpa id atau nama dibuang, dan field rusak diberi nilai aman (lihat `normalizeItem` dan `normalizeMember` di <mark style="background-color: #fef08a; color: #000;">src/utils/format.js</mark>).

## 🚀 Cara Menjalankan

Prasyarat: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka <mark style="background-color: #38bdf8; color: #000;">http://localhost:5173</mark> lalu masuk memakai akun demo di atas 
atau buka <mark style="background-color: #38bdf8; color: #000;">https://shfirazahra.github.io/smi-sekolahmusik/</mark>

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # menjalankan hasil build secara lokal
npm run lint      # Oxlint
npm run deploy    # publikasi ke GitHub Pages (gh-pages)
```

> Path dasar build produksi diatur di <mark style="background-color: #fef08a; color: #000;">vite.config.js</mark> (<mark style="background-color: #fef08a; color: #000;">/smi-sekolahmusik/</mark>). Ubah jika nama repository Anda berbeda.

## 📡 Bahasa Pemrograman dan Tools

- JavaScript (JSX) dengan **React 19**
- **Vite** sebagai build tool
- **Tailwind CSS v3** (via PostCSS) untuk styling
- **Fetch API** untuk integrasi REST (tanpa Axios)
- **Oxlint** untuk linting
- **Git** untuk version control

Library tambahan: tidak ada library UI/state/routing tambahan. Dependensi selain React hanya tooling (Vite, Tailwind, PostCSS, Autoprefixer, Oxlint) dan <mark style="background-color: #fef08a; color: #000;">gh-pages</mark> untuk deploy.

## 📂 Struktur Folder

```
src/
  components/   Komponen reusable: AsyncBoundary, Loading, ErrorMessage, EmptyState, FilterField,
                AttendanceFilters, StatCard, StatusBadge, StudentAttendanceTable, PersonalAttendance,
                ItemCard, ItemImage, PriceTag, MemberCard, CatalogFormModal, BookingModal, Toast, Navbar, Footer
  hooks/        Logika data dan state: useData (fetch + CRUD katalog), useAttendance, useAuth,
                useCatalogFilter, useOrders, useToast, useContactForm
  pages/        Login, Home, About, Catalog, ItemDetail, Orders, Contact, Attendance
  services/     api.js (fetch REST) dan auth.js (login, registrasi, role, sesi)
  utils/        format.js (rupiah, normalisasi data), date.js (format tanggal),
                attendance.js (bangun data, filter, hitung ringkasan & persentase — fungsi murni)
  data/         Teks testimoni statis
public/data/    catalog.json (dataset lokal)
```

## 🛠️ Keputusan Teknis

- **Logika dipisah dari UI**: pengambilan data di <mark style="background-color: #fef08a; color: #000;">services/</mark>, pengolahan data (filter, ringkasan, persentase) berupa fungsi murni di <mark style="background-color: #fef08a; color: #000;">utils/</mark>, state filter di custom hook <mark style="background-color: #fef08a; color: #000;">useAttendance</mark>. Komponen hanya menampilkan hasilnya.
- **Komponen reusable**: filter kehadiran (`AttendanceFilters`) dipakai untuk riwayat personal maupun murid; <mark style="background-color: #fef08a; color: #000;">AsyncBoundary</mark> dipakai semua daftar.
- **Role**: pembatasan akses dilakukan di level aplikasi (<mark style="background-color: #fef08a; color: #000;">App.jsx</mark>, <mark style="background-color: #fef08a; color: #000;">Navbar</mark>, <mark style="background-color: #fef08a; color: #000;">Catalog</mark>, <mark style="background-color: #fef08a; color: #000;">ItemDetail</mark>). Halaman Presensi hanya untuk Instruktur; "Pendaftaran Kelas" hanya untuk User.
- Navigasi antar halaman memakai state internal (tanpa library routing) untuk menjaga kesederhanaan.

## 📄 Catatan

- Seluruh autentikasi, data kehadiran, dan perubahan katalog adalah **simulasi front-end**. Password disimpan apa adanya di <mark style="background-color: #fef08a; color: #000;">localStorage</mark> hanya untuk keperluan demo dan tidak boleh dipakai di produksi.
