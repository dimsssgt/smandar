"use client";

import { useSchoolData } from "@/lib/useSchoolData";
import { formatDate } from "@/lib/adminStore";

export default function InfoSection() {
  const pengumuman = useSchoolData("pengumuman").slice(0, 3);
  const agenda = useSchoolData("agenda").slice(0, 3);

  if (pengumuman.length === 0 && agenda.length === 0) return null;

  const Block = ({ title, items, withLocation }) =>
    items.length > 0 && (
      <div>
        <h2 className="font-serif text-2xl font-medium text-slate-900">{title}</h2>
        <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {items.map((i) => (
            <li key={i.id} className="py-3">
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {formatDate(i.date)}
                {withLocation && i.location ? ` | ${i.location}` : ""}
              </p>
              <p className="mt-1 font-medium text-slate-900">{i.title}</p>
              {i.content && <p className="mt-1 text-sm text-slate-600">{i.content}</p>}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:grid-cols-2">
      <Block title="Pengumuman" items={pengumuman} />
      <Block title="Agenda" items={agenda} withLocation />
    </section>
  );
}
