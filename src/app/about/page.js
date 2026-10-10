import Link from "next/link";

const profil = [
  { label: "Nama Sekolah", value: "SMA Negeri 1 Bandar" },
  { label: "NPSN", value: "20322745" },
  { label: "Status", value: "Negeri" },
  { label: "Akreditasi", value: "A (Unggul) - 2021" },
];

const sejarah = [
  { year: "1990", text: "Menerima siswa baru pertama kali; 8 Agustus 1990 ditetapkan sebagai hari jadi sekolah." },
  { year: "2007", text: "Keterampilan Lingkungan Hidup ditetapkan sebagai keunggulan lokal." },
  { year: "2013", text: "Menerapkan standar mutu ISO 9001:2008." },
  { year: "2016", text: "Meraih sertifikat Sekolah Adiwiyata Nasional." },
];

const misi = [
  "Meningkatkan budaya cinta lingkungan hidup.",
  "Membentuk generasi yang beriman, bertakwa, dan berakhlak mulia.",
  "Meningkatkan kreativitas dalam seni budaya.",
  "Meningkatkan penguasaan IPTEK.",
  "Membiasakan pola hidup sehat.",
];

const fasilitas = ["Auditorium", "Taman Hijau", "Lab. Komputer", "Studio Musik", "Lab Biologi", "Lab. Fisika", "Lab. Kimia", "Ruang Kesenian"];
const ekskul = ["OSIS", "PMR", "Enviro Jugo", "Karate", "Paskibra", "Pramuka", "Futsal", "Basket", "Volly", "Sepak Bola", "Panahan", "Fotografi"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Tentang Kami</p>
      <h1 className="mt-2 font-serif text-4xl font-medium text-slate-900">SMA Negeri 1 Bandar</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Sekolah negeri di Kabupaten Batang dengan keunggulan lokal pendidikan lingkungan hidup.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {profil.map((p) => (
          <div key={p.label} className="bg-white p-5 transition-colors hover:bg-emerald-50">
            <p className="text-xs uppercase tracking-widest text-slate-500">{p.label}</p>
            <p className="mt-1 font-medium text-slate-900">{p.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-4 font-serif text-2xl font-medium text-slate-900">Sejarah Singkat</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <p className="leading-relaxed text-slate-600">
            SMA Negeri 1 Bandar menerima peserta didik baru untuk pertama kalinya pada tahun ajaran 1990/1991.
            Pada semester pertama kegiatan belajar sempat menumpang di SMP Negeri 1 Bandar, sebelum menempati
            gedung sendiri di Jalan Raya Sidayu. Sejak saat itu sekolah terus berkembang mengikuti perubahan
            kurikulum hingga Kurikulum Merdeka.
          </p>
          <ul className="space-y-4 border-l border-slate-200 pl-6">
            {sejarah.map((s) => (
              <li key={s.year} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-600" />
                <p className="font-semibold text-slate-900">{s.year}</p>
                <p className="text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 font-serif text-2xl font-medium text-slate-900">Visi &amp; Misi</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-emerald-600 bg-emerald-50 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">Visi</p>
            <p className="font-serif text-xl text-slate-900">
              Terwujudnya Generasi Pelestari Lingkungan, Berakhlak, Kreatif, Berilmu, dan Sehat.
            </p>
          </div>
          <ol className="space-y-3 text-slate-600">
            {misi.map((m, i) => (
              <li key={m} className="flex gap-3">
                <span className="font-semibold text-emerald-700">{String(i + 1).padStart(2, "0")}</span>
                {m}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 font-serif text-2xl font-medium text-slate-900">Fasilitas &amp; Ekstrakurikuler</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {fasilitas.map((f) => (
            <div key={f} className="rounded-lg border border-slate-200 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Fasilitas</p>
              <p className="mt-1 font-serif text-lg text-slate-900">{f}</p>
            </div>
          ))}
          {ekskul.map((e) => (
            <div key={e} className="rounded-lg border border-slate-200 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Ekskul</p>
              <p className="mt-1 font-serif text-lg text-slate-900">{e}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 font-serif text-2xl font-medium text-slate-900">Alamat &amp; Kontak</h2>
        <div className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-2">
          <div className="bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">Alamat</p>
            <p className="text-slate-700">Jl. Raya Sidayu Km. 3 Bandar, Kec. Bandar, Kab. Batang, Jawa Tengah</p>
          </div>
          <div className="bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">Telepon</p>
            <p className="text-slate-700">0285-689165</p>
          </div>
          <div className="bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">Email</p>
            <Link href="mailto:admin@sman1bandar.sch.id" className="text-slate-700 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline">
              admin@sman1bandar.sch.id
            </Link>
          </div>
          <div className="bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">WhatsApp</p>
            <Link href="https://wa.me/6285876051553" className="text-slate-700 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline">
              0858-7605-1553
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
