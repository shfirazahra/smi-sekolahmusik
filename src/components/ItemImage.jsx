import { useState } from "react";

// Menampilkan gambar item; jika URL kosong atau gagal dimuat, tampil placeholder.
export default function ItemImage({ item, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 text-xs font-bold uppercase tracking-wider text-indigo-400 ${className}`}>
        {item.type}
      </div>
    );
  }
  return (
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
