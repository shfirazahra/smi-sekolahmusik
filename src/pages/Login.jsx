import { useState } from "react";
import { login, registerUser, validateLogin, validateRegister } from "../services/auth";

export default function Login({ onSuccess, onCancel, notice }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (isRegistering) {
      const validation = validateRegister(form);
      setErrors(validation);
      if (Object.keys(validation).length > 0) return;

      const result = registerUser(form);
      if (result.ok) onSuccess(result.session);
      else setFormError(result.message);
    } else {
      const validation = validateLogin(form);
      setErrors(validation);
      if (Object.keys(validation).length > 0) return;

      const result = login(form);
      if (result.ok) onSuccess(result.session);
      else setFormError(result.message);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    setFormError("");
  };

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
          <h1 className="text-2xl font-black text-slate-900">
            {isRegistering ? "Pendaftaran Akun" : "Masuk ke Portal"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {isRegistering
              ? "Buat akun baru untuk mulai memesan kelas musik."
              : "Sekolah Musik — bagian dari ekosistem PT SMI."}
          </p>
        </div>

        {notice && !isRegistering && (
          <p className="rounded-xl bg-indigo-50 p-3 text-xs font-medium text-indigo-800">{notice}</p>
        )}

        {isRegistering && (
          <div>
            <label htmlFor="name" className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="bg-slate-50 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-700">{errors.name}</p>}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@domain.com"
            className="bg-slate-50 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
          {errors.email && <p className="mt-1 text-xs text-rose-700">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            className="bg-slate-50 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
          {errors.password && <p className="mt-1 text-xs text-rose-700">{errors.password}</p>}
        </div>

        {formError && (
          <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-800">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
        >
          {isRegistering ? "Daftar Akun Baru" : "Masuk"}
        </button>

        <div className="pt-2 text-center text-xs">
          <p className="text-slate-500">
            {isRegistering ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-bold text-indigo-600 hover:underline"
            >
              {isRegistering ? "Masuk di sini" : "Daftar di sini"}
            </button>
          </p>
        </div>

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