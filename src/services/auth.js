// Autentikasi simulasi: akun dummy, sesi disimpan di localStorage.
const SESSION_KEY = "smi_session";

const DUMMY_USER = {
  email: "admin@smi.co.id",
  password: "smi12345",
  name: "Admin SMI",
};

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email wajib diisi.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Format email tidak valid.";
  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 6) errors.password = "Password minimal 6 karakter.";
  return errors;
}

export function login({ email, password }) {
  if (email.trim().toLowerCase() === DUMMY_USER.email && password === DUMMY_USER.password) {
    const session = { email: DUMMY_USER.email, name: DUMMY_USER.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, session };
  }
  return { ok: false, message: "Email atau password salah." };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}
