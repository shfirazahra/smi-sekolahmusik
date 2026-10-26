import { useState } from "react";
import { login, validateLogin } from "../services/auth";

export default function Login({ onSuccess, onCancel, notice }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateLogin(form);
    setErrors(validation);
    setFormError("");
    if (Object.keys(validation).length > 0) return;

    const result = login(form);
    if (result.ok) onSuccess(result.session);
    else setFormError(result.message);
  };

  const field = (name, label, type, placeholder) => (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-slate-50 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
      />
      {errors[name] && <p className="mt-1 text-xs text-rose-700">{errors[name]}</p>}
    </div>
  );

  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-slate-100 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-lg border border-slate-200 animate-fade-in"
      >
        <div className="mb-2">
          <div className="mb-4 inline-block rounded-2xl bg-indigo-600 p-2.5 text-lg font-black leading-none text-white shadow-md shadow-indigo-600/20">
            SM
          </div>
          <h1 className="text-2xl font-black text-slate-900">Masuk ke Portal</h1>
          <p className="mt-1 text-xs text-slate-500">
            Sekolah Musik — bagian dari ekosistem layanan PT Sinergi Mandiricipta Indonesia.
          </p>
        </div>
        {notice && (
          <p className="rounded-xl bg-indigo-50 p-3 text-xs font-medium text-indigo-800">{notice}</p>
        )}
        {field("email", "Email", "email", "admin@smi.co.id")}
        {field("password", "Password", "password", "Minimal 6 karakter")}
        {formError && (
          <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-800">
            {formError}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
        >
          Masuk
        </button>
        <p className="text-center text-[11px] text-slate-400">
          Akun demo: admin@smi.co.id / smi12345
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
        >
          Kembali
        </button>
      </form>
    </main>
  );
}
