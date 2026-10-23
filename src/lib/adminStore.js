import { newsData } from "@/components/NewsCard";

const KEYS = {
  creds: "smandar:admin:creds",
  session: "smandar:admin:session",
  data: "smandar:data",
};

export const COLLECTIONS = {
  berita: { label: "Berita", fields: ["title", "date", "excerpt", "content", "image"] },
  pengumuman: { label: "Pengumuman", fields: ["title", "date", "content"] },
  agenda: { label: "Agenda", fields: ["title", "date", "location", "content"] },
};

export const SEED = { berita: newsData, pengumuman: [], agenda: [] };

const BULAN = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];

export function toISO(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const m = String(value).trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return "";
  const idx = BULAN.indexOf(m[2].toLowerCase());
  if (idx < 0) return "";
  return `${m[3]}-${String(idx + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value || "";
  const [y, m, d] = value.split("-").map(Number);
  const nama = BULAN[m - 1];
  return `${d} ${nama[0].toUpperCase()}${nama.slice(1)} ${y}`;
}

const isBrowser = () => typeof window !== "undefined";
const notify = () => isBrowser() && window.dispatchEvent(new Event("smandar:change"));

function read(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error("Penyimpanan penuh. Hapus data lama atau pakai gambar yang lebih kecil.");
  }
  notify();
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const DEFAULT_LOGIN = { username: "admin", password: "admin123" };

async function ensureCreds() {
  let creds = read(KEYS.creds, null);
  if (!creds) {
    creds = { username: DEFAULT_LOGIN.username, hash: await sha256(DEFAULT_LOGIN.password), isDefault: true };
    write(KEYS.creds, creds);
  }
  return creds;
}

export async function login(username, password) {
  const creds = await ensureCreds();
  const ok = username.trim() === creds.username && (await sha256(password)) === creds.hash;
  if (ok) write(KEYS.session, { username: creds.username, at: Date.now() });
  return ok;
}

export function logout() {
  if (isBrowser()) window.localStorage.removeItem(KEYS.session);
  notify();
}

export const getSession = () => read(KEYS.session, null);

export async function usesDefaultLogin() {
  return !!(await ensureCreds()).isDefault;
}

export async function changeCredentials(oldPassword, username, newPassword) {
  const creds = await ensureCreds();
  if ((await sha256(oldPassword)) !== creds.hash) return false;
  const name = username.trim() || creds.username;
  write(KEYS.creds, { username: name, hash: newPassword ? await sha256(newPassword) : creds.hash, isDefault: false });
  write(KEYS.session, { username: name, at: Date.now() });
  return true;
}

export function getAll() {
  return { ...SEED, ...(read(KEYS.data, null) || {}) };
}

export const getList = (name) => getAll()[name] || [];

export function saveItem(name, item) {
  const all = getAll();
  const list = all[name] || [];
  const exists = item.id !== undefined && list.some((x) => String(x.id) === String(item.id));
  const next = exists
    ? list.map((x) => (String(x.id) === String(item.id) ? item : x))
    : [{ ...item, id: crypto.randomUUID() }, ...list];
  write(KEYS.data, { ...all, [name]: next });
}

export function deleteItem(name, id) {
  const all = getAll();
  write(KEYS.data, { ...all, [name]: (all[name] || []).filter((x) => String(x.id) !== String(id)) });
}

export const exportData = () => JSON.stringify(getAll(), null, 2);

export function importData(json) {
  const parsed = JSON.parse(json);
  const clean = {};
  for (const k of Object.keys(COLLECTIONS)) clean[k] = Array.isArray(parsed[k]) ? parsed[k] : [];
  write(KEYS.data, clean);
}

export function resetData() {
  if (isBrowser()) window.localStorage.removeItem(KEYS.data);
  notify();
}
