import { formatRupiah, unitOf } from "../utils/format";

export default function PriceTag({ item, className = "" }) {
  const price = formatRupiah(item.price);
  if (!price) {
    return <p className="text-sm font-semibold text-slate-500">Hubungi kami untuk harga</p>;
  }
  return (
    <p className={className}>
      {price}
      <span className="text-xs font-normal text-slate-500"> / {unitOf(item)}</span>
    </p>
  );
}
