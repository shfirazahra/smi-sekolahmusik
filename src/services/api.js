const DUMMYJSON_URL = "https://dummyjson.com";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Permintaan gagal (status ${res.status}).`);
  return res.json();
}

// Fitur 1: katalog kelas musik dari dataset lokal (public/data/catalog.json)
export async function fetchCatalog() {
const data = await getJson(`${import.meta.env.BASE_URL}data/catalog.json`);
  return Array.isArray(data.items) ? data.items : [];
}

// Fitur 2: daftar anggota tim dari API DummyJSON
export async function fetchTeam(limit = 6) {
  const data = await getJson(`${DUMMYJSON_URL}/users?limit=${limit}`);
  return Array.isArray(data.users) ? data.users : [];
}
