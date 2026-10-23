"use client";

import Link from "next/link";
import Image from "next/image";
import { useSchoolData } from "@/lib/useSchoolData";
import { formatDate } from "@/lib/adminStore";

export default function NewsDetail({ id }) {
  const berita = useSchoolData("berita");
  const article = berita.find((n) => String(n.id) === String(id));

  return (
    <article className="mx-auto max-w-5xl px-5 py-12">
      <Link
        href="/berita"
        className="text-xs font-semibold uppercase tracking-widest text-slate-900 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline"
      >
        &larr; Kembali ke Berita
      </Link>

      {!article ? (
        <p className="mt-8 text-slate-600">Berita tidak ditemukan.</p>
      ) : (
        <>
          <p className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            {formatDate(article.date)}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-slate-900 md:text-4xl">{article.title}</h1>

          {article.image && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-emerald-50">
              <Image src={article.image} alt={article.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mt-8 space-y-5 text-justify leading-relaxed text-slate-700">
            {(article.content || "").split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
