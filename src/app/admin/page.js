"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./admin.css";
import {
  COLLECTIONS,
  DEFAULT_LOGIN,
  changeCredentials,
  deleteItem,
  exportData,
  formatDate,
  getAll,
  getSession,
  importData,
  login,
  logout,
  resetData,
  saveItem,
  toISO,
  usesDefaultLogin,
} from "@/lib/adminStore";

const FIELD_LABEL = {
  title: "Judul",
  date: "Tanggal",
  excerpt: "Ringkasan singkat",
  content: "Isi (pisahkan paragraf dengan baris kosong)",
  image: "Gambar",
  location: "Lokasi",
};

const LONG_FIELDS = ["content", "excerpt"];

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);

  const refresh = useCallback(() => setSession(getSession()), []);

  useEffect(() => {
    refresh();
    setReady(true);
    window.addEventListener("smandar:change", refresh);
    return () => window.removeEventListener("smandar:change", refresh);
  }, [refresh]);

  if (!ready) return null;
  return session ? <Dashboard session={session} /> : <Login />;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    usesDefaultLogin().then(setIsDefault);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const ok = await login(username, password);
    setBusy(false);
    if (!ok) setError("Username atau password salah.");
  }

  return (
    <main className="adm-login">
      <form className="adm-login-card" onSubmit={onSubmit}>
        <h1>Masuk Admin</h1>
        <p className="adm-muted">Kelola berita, pengumuman, dan agenda sekolah.</p>

        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>

        {error && <p className="adm-error" role="alert">{error}</p>}
        <button className="adm-btn adm-btn-primary" disabled={busy}>
          {busy ? "Memeriksa…" : "Masuk"}
        </button>

        {isDefault && (
          <p className="adm-hint">
            Login awal: <b>{DEFAULT_LOGIN.username}</b> / <b>{DEFAULT_LOGIN.password}</b>. Segera ganti di menu Akun.
          </p>
        )}
      </form>
    </main>
  );
}

const TABS = [...Object.keys(COLLECTIONS), "akun", "data"];

function Dashboard({ session }) {
  const [tab, setTab] = useState("berita");
  const [counts, setCounts] = useState({});
  const [toast, setToast] = useState("");

  const recount = useCallback(() => {
    const all = getAll();
    setCounts(Object.fromEntries(Object.keys(COLLECTIONS).map((k) => [k, (all[k] || []).length])));
  }, []);

  useEffect(() => {
    recount();
    window.addEventListener("smandar:change", recount);
    return () => window.removeEventListener("smandar:change", recount);
  }, [recount]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const label = (t) => COLLECTIONS[t]?.label || (t === "akun" ? "Akun" : "Data");

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          <strong>SMAN 1 Bandar</strong>
          <span className="adm-muted">Masuk sebagai {session.username}</span>
        </div>
        <nav>
          {TABS.map((t) => (
            <button key={t} className={`adm-nav ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
              {label(t)}
              {counts[t] !== undefined && <span className="adm-count">{counts[t]}</span>}
            </button>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" className="adm-link">Lihat website</a>
          <button className="adm-btn" onClick={logout}>Keluar</button>
        </div>
      </aside>

      <main className="adm-main">
        <h1 className="adm-title">{label(tab)}</h1>
        {COLLECTIONS[tab] && <CollectionManager key={tab} name={tab} notify={setToast} />}
        {tab === "akun" && <AccountPanel notify={setToast} />}
        {tab === "data" && <DataPanel notify={setToast} />}
      </main>

      {toast && <div className="adm-toast" role="status">{toast}</div>}
    </div>
  );
}

function emptyItem(name) {
  const item = {};
  COLLECTIONS[name].fields.forEach((f) => (item[f] = f === "date" ? new Date().toISOString().slice(0, 10) : ""));
  return item;
}

function CollectionManager({ name, notify }) {
  const { fields, label } = COLLECTIONS[name];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  const load = useCallback(() => setItems(getAll()[name] || []), [name]);
  useEffect(() => {
    load();
    window.addEventListener("smandar:change", load);
    return () => window.removeEventListener("smandar:change", load);
  }, [load]);

  const shown = items.filter((i) => (i.title || "").toLowerCase().includes(query.toLowerCase()));

  function onSave(item) {
    try {
      saveItem(name, item);
      setEditing(null);
      notify(`${label} disimpan.`);
    } catch (e) {
      notify(e.message);
    }
  }

  function onDelete(item) {
    if (!window.confirm(`Hapus "${item.title}"?`)) return;
    deleteItem(name, item.id);
    notify(`${label} dihapus.`);
  }

  if (editing) return <ItemForm name={name} fields={fields} item={editing} onSave={onSave} onCancel={() => setEditing(null)} />;

  return (
    <>
      <div className="adm-toolbar">
        <input className="adm-search" placeholder={`Cari ${label.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing(emptyItem(name))}>
          Tambah {label.toLowerCase()}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="adm-empty">
          {items.length === 0 ? `Belum ada ${label.toLowerCase()}. Klik “Tambah ${label.toLowerCase()}” untuk mulai.` : "Tidak ada hasil yang cocok."}
        </p>
      ) : (
        <ul className="adm-list">
          {shown.map((i) => (
            <li key={i.id} className="adm-row">
              {i.image ? <img src={i.image} alt="" className="adm-thumb" /> : <div className="adm-thumb adm-thumb-empty" />}
              <div className="adm-row-body">
                <strong>{i.title || "(tanpa judul)"}</strong>
                <span className="adm-muted">
                  {[formatDate(i.date), i.location].filter(Boolean).join("  |  ")}
                </span>
              </div>
              <button className="adm-btn" onClick={() => setEditing(i)}>Edit</button>
              <button className="adm-btn adm-btn-danger" onClick={() => onDelete(i)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ItemForm({ name, fields, item, onSave, onCancel }) {
  const [form, setForm] = useState({ ...item, date: toISO(item.date) || item.date || "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 600 * 1024) {
      alert("Ukuran gambar maksimal 600 KB karena disimpan di localStorage.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set("image", reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <form
      className="adm-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      {fields.map((f) => (
        <label key={f}>
          {FIELD_LABEL[f] || f}
          {f === "image" ? (
            <>
              <input value={form.image && !form.image.startsWith("data:") ? form.image : ""} onChange={(e) => set("image", e.target.value)} placeholder="/news1.jpg atau https://…" />
              <input type="file" accept="image/*" onChange={onFile} />
              {form.image && (
                <span className="adm-preview">
                  <img src={form.image} alt="Pratinjau" />
                  <button type="button" className="adm-btn" onClick={() => set("image", "")}>Hapus gambar</button>
                </span>
              )}
            </>
          ) : LONG_FIELDS.includes(f) ? (
            <textarea rows={f === "content" ? 8 : 3} value={form[f] || ""} onChange={(e) => set(f, e.target.value)} />
          ) : (
            <input
              type={f === "date" ? "date" : "text"}
              value={form[f] || ""}
              onChange={(e) => set(f, e.target.value)}
              required={f === "title"}
            />
          )}
        </label>
      ))}
      <div className="adm-actions">
        <button type="button" className="adm-btn" onClick={onCancel}>Batal</button>
        <button className="adm-btn adm-btn-primary">Simpan</button>
      </div>
    </form>
  );
}

function AccountPanel({ notify }) {
  const [username, setUsername] = useState(getSession()?.username || "");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (newPw && newPw.length < 6) return setError("Password baru minimal 6 karakter.");
    const ok = await changeCredentials(oldPw, username, newPw);
    if (!ok) return setError("Password lama salah.");
    setOldPw("");
    setNewPw("");
    notify("Akun diperbarui.");
  }

  return (
    <form className="adm-form" onSubmit={onSubmit}>
      <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
      <label>Password lama<input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} required /></label>
      <label>Password baru (kosongkan jika tidak diganti)<input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} /></label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <div className="adm-actions"><button className="adm-btn adm-btn-primary">Simpan akun</button></div>
    </form>
  );
}

function DataPanel({ notify }) {
  const fileRef = useRef(null);

  function onExport() {
    const blob = new Blob([exportData()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `smandar-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function onImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importData(String(reader.result));
        notify("Data berhasil diimpor.");
      } catch {
        notify("File tidak valid.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="adm-form">
      <p className="adm-muted">
        Data tersimpan di localStorage browser ini saja. Ekspor secara berkala sebagai cadangan, atau untuk memindahkan data ke perangkat lain.
      </p>
      <div className="adm-actions" style={{ justifyContent: "flex-start" }}>
        <button className="adm-btn adm-btn-primary" onClick={onExport}>Ekspor JSON</button>
        <button className="adm-btn" onClick={() => fileRef.current?.click()}>Impor JSON</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={onImport} />
        <button
          className="adm-btn adm-btn-danger"
          onClick={() => {
            if (window.confirm("Reset semua data ke kondisi awal?")) {
              resetData();
              notify("Data direset.");
            }
          }}
        >
          Reset data
        </button>
      </div>
    </div>
  );
}
