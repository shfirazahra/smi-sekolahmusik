const SESSION_KEY = "smi_session";
const USERS_KEY = "smi_registered_users";

export const ROLES = { INSTRUCTOR: "instructor", USER: "user" };

// Akun bawaan sistem (tidak disimpan ke localStorage, selalu tersedia).
export const DEFAULT_USERS = [
  {
    email: "instruktur@smi.co.id",
    password: "smi12345",
    name: "Instruktur SMI",
    role: ROLES.INSTRUCTOR,
  },
];

// Role lama "admin" dipetakan ke "instructor" agar sesi/akun lama di localStorage tetap valid.
const normalizeRole = (role) => (role === "admin" ? ROLES.INSTRUCTOR : role === ROLES.INSTRUCTOR ? role : ROLES.USER);

export const isInstructor = (session) => session?.role === ROLES.INSTRUCTOR;
export const roleLabel = (session) => (isInstructor(session) ? "Instruktur" : "User");

const isDefaultEmail = (email) => DEFAULT_USERS.some((u) => u.email === email.toLowerCase());

// Hanya akun hasil registrasi yang ada di localStorage; akun bawaan selalu digabung di depan.
function getRegisteredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users.filter((u) => u && typeof u.email === "string" && !isDefaultEmail(u.email)) : [];
  } catch {
    return [];
  }
}

const getAllUsers = () => [...DEFAULT_USERS, ...getRegisteredUsers()];

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email || !email.trim()) errors.email = "Email wajib diisi.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Format email tidak valid.";
  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 6) errors.password = "Password minimal 6 karakter.";
  return errors;
}

export function validateRegister({ name, email, password }) {
  const errors = validateLogin({ email, password });
  if (!name || !name.trim()) errors.name = "Nama lengkap wajib diisi.";
  return errors;
}

// Login untuk Instruktur dan User
export function login({ email, password }) {
  const users = getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const foundUser = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (foundUser) {
    const session = {
      email: foundUser.email,
      name: foundUser.name,
      role: normalizeRole(foundUser.role),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, session };
  }

  return { ok: false, message: "Email atau password salah." };
}

// Registrasi pengguna baru (role otomatis "user")
export function registerUser({ name, email, password }) {
  const registered = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const isExist = getAllUsers().some((u) => u.email.toLowerCase() === normalizedEmail);
  if (isExist) {
    return { ok: false, message: "Email sudah terdaftar. Silakan login." };
  }

  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: ROLES.USER,
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...registered, newUser]));

  // Otomatis login setelah registrasi
  const session = { email: newUser.email, name: newUser.name, role: newUser.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { ok: true, session };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!session || typeof session.email !== "string") return null;
    return { ...session, role: normalizeRole(session.role) };
  } catch {
    return null;
  }
}