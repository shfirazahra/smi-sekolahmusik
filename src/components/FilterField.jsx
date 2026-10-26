const inputClass =
  "mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

// Label + kontrol form. Kontrol default <input>; kirim `as="select"` dengan children untuk dropdown.
export default function FilterField({ label, as: Tag = "input", children, ...props }) {
  return (
    <label className="text-xs font-semibold text-slate-600">
      {label}
      <Tag className={inputClass} {...props}>
        {children}
      </Tag>
    </label>
  );
}
