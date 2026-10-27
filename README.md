# Sekolah Musik — Instructor Attendance (Front-End Coding Test)

Aplikasi web Sekolah Musik SMI yang dibuat untuk coding test Front-End. Fitur utama sesuai soal adalah **Web App Instructor Attendance**: instruktur login, lalu memantau kehadiran personal dan kehadiran murid lengkap dengan persentase dan filter riwayat. Aplikasi juga memiliki katalog kelas dan alur pendaftaran kelas sebagai pelengkap.

## Deskripsi Aplikasi

### 1. Halaman Login
- Form login sederhana (email + password) dengan validasi: email wajib & berformat benar, password wajib minimal 6 karakter.
- Autentikasi **disimulasikan** (tanpa back-end): akun bawaan ada di kode, akun hasil registrasi dan sesi disimpan di `localStorage`.
- Ada dua role:
  - **Instruktur** — akun bawaan, masuk ke halaman Presensi dan dapat mengelola katalog.
  - **User** — dibuat lewat form "Daftar di sini"; dapat mendaftar kelas dan melihat "Pendaftaran Kelas".

**Akun demo instruktur:** `instruktur@smi.co.id` / `smi12345`

### 2. Presensi Instruktur (khusus role Instruktur)
| Fitur pada soal | Lokasi di aplikasi |
| --- | --- |
| Melihat attendance personal | Bagian **Kehadiran personal**: kartu ringkasan + tabel riwayat |
| Melihat total absensi murid | Kartu **Total absensi murid** (alpa + izin + sakit, dengan rinciannya) |
| Presentase kehadiran murid dan personal | Kartu **Persentase kehadiran murid**, bar **Presentasi Kehadiran Murid** per status, serta persentase pada **Kehadiran Personal** |
| Filter history kehadiran personal dan murid | Dua filter yang berdiri sendiri: personal (rentang tanggal + status) dan murid (rentang tanggal + status + cari nama/email) |

Catatan perilaku filter:
- Persentase dan total pada ringkasan mengikuti **rentang tanggal** (dan pencarian untuk murid). Filter **status** hanya mempersempit isi tabel, agar persentase kehadiran tidak menjadi 0% atau 100% saat status dipilih.
- Rentang tanggal tidak valid (tanggal awal melewati tanggal akhir) menampilkan pesan, bukan tabel kosong yang membingungkan.
- Form **Catat Kehadiran Hari Ini** (fitur tambahan) mengganti status seorang murid pada hari ini; hasilnya ikut terhitung di ringkasan dan filter. Data ini hanya ada di memori dan hilang saat halaman dimuat ulang.

### 3. Sumber Data
- **DummyJSON** (`GET https://dummyjson.com/users?limit=30`) — daftar murid/tim. Dipakai di halaman Presensi dan bagian "Tim Kami" di Beranda.
- **Dataset buatan sendiri** (`public/data/catalog.json`, di-fetch lewat Fetch API) — katalog kelas musik. Dataset ini melengkapi DummyJSON, sesuai ketentuan soal.
- DummyJSON tidak menyediakan data presensi, sehingga **status kehadiran murid dan instruktur dibuat simulasi** di sisi front-end (pola deterministik dari id murid dan tanggal) lalu diproses (filter, hitung, persentase) dari data tersebut. Ini data contoh, bukan catatan presensi nyata.

### 4. Fitur Pelengkap
- **Katalog Kelas**: cari nama kelas, filter kategori, halaman detail, dan pendaftaran kelas (modal) untuk User. Instruktur melihat tombol Tambah/Edit/Hapus kelas; perubahan hanya di memori dan kembali ke data awal saat halaman dimuat ulang.
- **Pendaftaran Kelas**: riwayat pendaftaran kelas oleh User selama sesi berjalan.
- Beranda, Tentang, dan Kontak.

### Penanganan State
- **Loading**, **error** (dengan tombol *Coba lagi*), dan **data kosong** ditangani seragam oleh komponen `AsyncBoundary`.
- **Data invalid**: item/murid tanpa id atau nama dibuang, dan field rusak diberi nilai aman (lihat `normalizeItem` dan `normalizeMember` di `src/utils/format.js`).

## Cara Menjalankan

Prasyarat: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` lalu masuk memakai akun demo di atas.
Atau buka https://shfirazahra.github.io/smi-sekolahmusik/

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # menjalankan hasil build secara lokal
npm run lint      # Oxlint
npm run deploy    # publikasi ke GitHub Pages (gh-pages)
```

> Path dasar build produksi diatur di `vite.config.js` (`/smi-sekolahmusik/`). Ubah jika nama repository Anda berbeda.

## Bahasa Pemrograman dan Tools

- JavaScript (JSX) dengan **React 19**
- **Vite** sebagai build tool
- **Tailwind CSS v3** (via PostCSS) untuk styling
- **Fetch API** untuk integrasi REST (tanpa Axios)
- **Oxlint** untuk linting
- **Git** untuk version control

Library tambahan: tidak ada library UI/state/routing tambahan. Dependensi selain React hanya tooling (Vite, Tailwind, PostCSS, Autoprefixer, Oxlint) dan `gh-pages` untuk deploy.

## Struktur Folder

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

## Keputusan Teknis

- **Logika dipisah dari UI**: pengambilan data di `services/`, pengolahan data (filter, ringkasan, persentase) berupa fungsi murni di `utils/`, state filter di custom hook `useAttendance`. Komponen hanya menampilkan hasilnya.
- **Komponen reusable**: filter kehadiran (`AttendanceFilters`) dipakai untuk riwayat personal maupun murid; `AsyncBoundary` dipakai semua daftar.
- **Role**: pembatasan akses dilakukan di level aplikasi (`App.jsx`, `Navbar`, `Catalog`, `ItemDetail`). Halaman Presensi hanya untuk Instruktur; "Pendaftaran Kelas" hanya untuk User.
- Navigasi antar halaman memakai state internal (tanpa library routing) untuk menjaga kesederhanaan.

## Catatan

- Seluruh autentikasi, data kehadiran, dan perubahan katalog adalah **simulasi front-end**. Password disimpan apa adanya di `localStorage` hanya untuk keperluan demo dan tidak boleh dipakai di produksi.
