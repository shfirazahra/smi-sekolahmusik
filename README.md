# Sekolah Musik — Prototipe Front-End SMI

Aplikasi web untuk coding test Front-End Engineer. Website Sekolah Musik dengan katalog program pembelajaran, alur pendaftaran demo, serta dashboard kehadiran instruktur untuk kebutuhan coding test.

## Deskripsi Aplikasi

- **Login**: form email dan password dengan validasi sederhana. Autentikasi disimulasikan dengan akun dummy, sesi disimpan di `localStorage`.
- **Alur akses**: Beranda, Tentang Kami, Katalog, dan Detail bisa dibuka tanpa login. Login diminta saat menekan tombol Daftar Kelas atau membuka halaman Pesanan, lalu pengguna dikembalikan ke tujuan semula setelah berhasil masuk. Tombol Masuk, nama pengguna, dan Keluar ada di navbar. Menu **Pesanan** dan **Kehadiran** (Panel Instruktur) hanya muncul di navbar setelah login dengan akun demo.
- **Katalog Kelas Musik**: data dari dataset buatan sendiri (`public/data/catalog.json`) yang diambil dengan `fetch`. Bisa dicari, difilter per kategori, dilihat detailnya, lalu melakukan pendaftaran demo melalui formulir.
- **Tim Kami**: data diambil dari API [DummyJSON](https://dummyjson.com/docs) (`/users`) dan ditampilkan di Beranda (nama, foto, departemen, kota).
- **Dashboard Kehadiran Instruktur**: ringkasan total catatan, kehadiran murid, alpa, izin/sakit, presentasi status kehadiran, kehadiran personal instruktur, dan riwayat yang dapat difilter berdasarkan rentang tanggal, status, nama, atau email.
- **Catatan data demo**: identitas murid diambil dari DummyJSON. Status presensi dan kehadiran personal adalah data simulasi di sisi frontend, bukan data absensi nyata atau data yang disimpan di backend.
- **Pendaftaran Saya**: daftar pemesanan yang dibuat selama sesi berjalan (disimpan di memori).
- State **loading**, **error** (dengan tombol coba lagi), **data kosong**, dan **data invalid** ditangani:
  - item tanpa nama dibuang dan jumlahnya dicatat,
  - harga tidak valid diganti "Hubungi kami untuk harga" dan tombol pendaftaran dinonaktifkan,
  - gambar kosong atau gagal dimuat diganti placeholder.

**Akun demo:** `admin@smi.co.id` / `smi12345`

## Cara Menjalankan

Prasyarat: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (http://localhost:5173).

Build produksi: `npm run build`

## Bahasa Pemrograman dan Tools

- JavaScript (JSX) dengan React 19
- Vite sebagai build tool
- Tailwind CSS v3 (via PostCSS) untuk styling
- Fetch API untuk integrasi REST
- Oxlint untuk linting (`npm run lint`)
- Git untuk version control
- Tidak ada library tambahan di luar yang tercantum di `package.json`

## Struktur Folder

```
src/
  components/   Komponen reusable (ItemCard, AsyncBoundary, Loading, ErrorMessage, EmptyState, StatCard, StatusBadge, FilterField, StudentAttendanceTable, PersonalAttendance, BookingModal, Toast, Navbar, Footer)
  hooks/        Logika data dan state: useData, useAttendance, useAuth, useCatalogFilter, useOrders, useToast, useContactForm
  pages/        Login, Home, About, Catalog, ItemDetail, Orders, Contact, Attendance
  services/     api.js (fetch) dan auth.js (login simulasi)
  utils/        format.js (rupiah, normalisasi data), date.js (format tanggal), attendance.js (hitung, filter, ringkasan kehadiran)
  data/         Teks testimoni statis
public/data/    catalog.json (dataset lokal)
```

## Keputusan Teknis

- Pengambilan dan pembersihan data dipisah dari UI lewat `services`, `utils`, dan custom hook. `App.jsx` hanya merangkai komponen.
- Logika kehadiran (membuat data simulasi, filter, ringkasan, persentase) ada di `utils/attendance.js` sebagai fungsi murni dan dipakai lewat hook `useAttendance`; `pages/Attendance.jsx` hanya menyusun tampilan.
- `AsyncBoundary` dipakai ulang di semua daftar agar loading, error, dan data kosong konsisten.
- `ItemCard` dipakai di Beranda dan Katalog agar tidak ada kode kartu ganda.
- Navigasi antar halaman memakai state, bukan library routing, karena aplikasi kecil dan tidak butuh URL per halaman.
- Dashboard Kehadiran memakai data contoh untuk status presensi; API DummyJSON hanya menyediakan data profil pengguna. Untuk penggunaan produksi, status presensi perlu dihubungkan ke API/backend absensi yang sah.


## Catatan penting untuk penilaian

- Harga, program kelas, akun demo, dan data kehadiran adalah data simulasi untuk demonstrasi frontend. Tidak ada pendaftaran atau absensi yang tersimpan ke server.
- Data profil contoh menggunakan DummyJSON; endpoint tersebut bukan data murid atau instruktur asli.
