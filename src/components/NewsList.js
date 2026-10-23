"use client";

import NewsCard from "./NewsCard";
import { useSchoolData } from "@/lib/useSchoolData";
import { formatDate } from "@/lib/adminStore";

export default function NewsList({ limit, className = "sm:grid-cols-2 lg:grid-cols-3" }) {
  const berita = useSchoolData("berita");
  const shown = limit ? berita.slice(0, limit) : berita;

  if (shown.length === 0) return <p className="text-slate-500">Belum ada berita.</p>;

  return (
    <div className={`grid gap-6 ${className}`}>
      {shown.map((n) => (
        <NewsCard key={n.id} id={n.id} title={n.title} date={formatDate(n.date)} excerpt={n.excerpt} image={n.image || "/logo.png"} />
      ))}
    </div>
  );
}
