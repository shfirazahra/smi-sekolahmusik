const SESSION_KEY = "smi_session";
const USERS_KEY = "smi_registered_users";

// Akun bawaan sistem
const DEFAULT_USERS = [
  {
    email: "admin@smi.co.id",
    password: "smi12345",
    name: "Admin SMI",
    role: "admin",
  },
];

function getStoredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) && users.length > 0 ? users : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email wajib diisi.";
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

// Fitur Login untuk Admin dan User
export function login({ email, password }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  
  const foundUser = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (foundUser) {
    const session = {
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role || "user",
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, session };
  }

  return { ok: false, message: "Email atau password salah." };
}

// Fitur Registrasi Pengguna Baru (Role secara otomatis 'user')
export function registerUser({ name, email, password }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const isExist = users.some((u) => u.email.toLowerCase() === normalizedEmail);
  if (isExist) {
    return { ok: false, message: "Email sudah terdaftar. Silakan login." };
  }

  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "user",
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

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
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}