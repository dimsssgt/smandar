import Link from "next/link";
import Image from "next/image";
import NewsList from "../components/NewsList";
import InfoSection from "../components/InfoSection";

const info = [
  { value: "A", label: "Akreditasi Unggul" },
  { value: "1990", label: "Tahun Berdiri" },
  { value: "2016", label: "Adiwiyata Nasional" },
  { value: "2,53 ha", label: "Luas Lahan" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
        <Image
          src="/hero.jpg"
          alt="Gedung SMA Negeri 1 Bandar"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-900/85 to-slate-900/40" />

        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32 lg:-translate-x-30">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo sekolah" width={44} height={44} className="h-11 w-11 rounded bg-white/90 object-contain p-1" />
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SMA Negeri 1 Bandar
            </p>
          </div>

          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-medium leading-tight md:text-6xl">
            Generasi pelestari lingkungan, <em className="text-emerald-300">berilmu</em> &amp; berakhlak dan sehat.
          </h1>
          <p className="mt-5 max-w-md text-white/85">Berkibar Hijau Jaya.</p>

          <Link
            href="/about"
            className="mt-8 inline-block rounded bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-emerald-600 hover:text-white"
          >
            Jelajahi Profil &rarr;
          </Link>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4">
          {info.map((item) => (
            <div key={item.label} className="border-l-2 border-emerald-600 pl-4">
              <p className="font-serif text-3xl text-slate-900">{item.value}</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[280px_1fr]">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-emerald-50">
            <Image src="/kepsek.jpg" alt="Kepala Sekolah" fill sizes="280px" className="object-cover" />
          </div>
          <p className="mt-3 font-serif text-lg text-slate-900">Sugeng, S.Pd., M.Pd.</p>
          <p className="text-xs text-slate-500">Plt. Kepala Sekolah</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Sambutan Pimpinan</p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-slate-900">
            Mendidik dengan hati, menjaga bumi bersama.
          </h2>
          <blockquote className="mt-5 border-l-2 border-emerald-600 pl-4 font-serif italic text-slate-600">
            &ldquo;Sekolah hijau bukan sekadar taman yang asri, melainkan cara kami menumbuhkan karakter.&rdquo;
          </blockquote>
          <p className="mt-5 leading-relaxed text-slate-600">
            SMA Negeri 1 Bandar adalah sebuah sekolah menengah atas negeri di Kabupaten Batang, Jawa Tengah, Indonesia. Berdiri pada tahun 1990 dengan tahun operasi sejak 1992 melalui nomor SK 046/0/1992 tanggal 15 Mei 1992. Ikon sekolah ini adalah sekolah hijau. Jenjang pendidikan sekolah di SMA Negeri 1 Bandar Batang selama tiga tahun pelajaran, mulai dari Kelas X sampai Kelas XII. Pada tahun 2015, SMA 1 Bandar memperoleh sertifikasi sekolah Adiwiyata Nasional dari Menteri Lingkungan Hidup Indonesia yaitu Siti Nurbaya Bakar dan dari Menteri Pendidikan dan Kebudayaan Indonesia yaitu Anies Baswedan.
          </p>
        </div>
      </section>

      <InfoSection />

      <section className="mx-auto max-w-6xl px-5">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Publikasi</p>
            <h2 className="font-serif text-3xl font-medium text-slate-900">Berita Terbaru</h2>
          </div>
          <Link
            href="/berita"
            className="text-xs font-semibold uppercase tracking-widest text-slate-900 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline"
          >
            Semua Berita &rarr;
          </Link>
        </div>

        <NewsList limit={4} className="sm:grid-cols-2 lg:grid-cols-4" />
      </section>
    </>
  );
}
