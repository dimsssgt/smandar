import NewsCard, { newsData } from "../../components/NewsCard";

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Arsip Publikasi</p>
      <h1 className="mt-2 font-serif text-4xl font-medium text-slate-900">Berita Sekolah</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Kabar kegiatan, prestasi, dan dinamika kehidupan SMA Negeri 1 Bandar.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsData.map((n) => (
          <NewsCard key={n.id} id={n.id} title={n.title} date={n.date} excerpt={n.excerpt} image={n.image} />
        ))}
      </div>
    </div>
  );
}
