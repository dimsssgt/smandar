import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-slate-900">SMA Negeri 1 Bandar</p>
          <p className="mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Berkibar Hijau Jaya
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">Alamat</p>
          <p>Jl. Raya Sidayu Km. 3 Bandar, Kec. Bandar, Kab. Batang, Jawa Tengah</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">Kontak</p>
          <p>0285-689165</p>
          <Link href="mailto:admin@sman1bandar.sch.id" className="underline-offset-4 transition-colors hover:text-emerald-700 hover:underline">
            admin@sman1bandar.sch.id
          </Link>
        </div>
      </div>

      <p className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        &copy; 2026 SMA Negeri 1 Bandar. Hak cipta dilindungi undang-undang.
      </p>
    </footer>
  );
}
