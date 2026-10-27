export function formatRupiah(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// Seluruh program di katalog dihitung per sesi.
export const unitOf = () => "Sesi";

// Membersihkan data katalog. Item tanpa id/nama dibuang (invalid),
// field lain yang rusak diberi nilai aman agar UI tidak error.
export function normalizeItem(raw) {
  if (!raw || raw.id == null || typeof raw.name !== "string" || !raw.name.trim()) return null;
  return {
    id: raw.id,
    name: raw.name.trim(),
    type: typeof raw.type === "string" && raw.type.trim() ? raw.type.trim() : "Kelas Musik",
    price: typeof raw.price === "number" && raw.price > 0 ? raw.price : null,
    featured: raw.featured === true,
    image: typeof raw.image === "string" ? raw.image : "",
    description: typeof raw.description === "string" ? raw.description : "Deskripsi belum tersedia.",
    features: Array.isArray(raw.features) ? raw.features.filter((f) => typeof f === "string") : [],
  };
}

// Membersihkan data anggota tim dari DummyJSON. Data tanpa id atau nama dibuang.
export function normalizeMember(raw) {
  if (!raw || raw.id == null) return null;
  const name = [raw.firstName, raw.lastName].filter(Boolean).join(" ").trim();
  if (!name) return null;
  return {
    id: raw.id,
    name,
    email: typeof raw.email === "string" && raw.email.trim() ? raw.email.trim() : "-",
    city: raw.address?.city || "Kota tidak diketahui",
    department: typeof raw.company?.department === "string" ? raw.company.department : "",
    image: typeof raw.image === "string" ? raw.image : "",
  };
}
