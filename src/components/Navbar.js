"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo SMA Negeri 1 Bandar"
            width={36}
            height={36}
            className="h-9 w-9 rounded object-contain"
          />
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">
              SMAN 1 BANDAR
            </span>
            <span className="block text-[10px] tracking-widest text-slate-500">
              KABUPATEN BATANG
            </span>
          </span>
        </Link>

        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b-2 py-1 text-base font-medium transition-colors hover:text-emerald-700 ${
                isActive(l.href)
                  ? "border-emerald-600 text-slate-900"
                  : "border-transparent text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          aria-expanded={open}
          className="rounded border border-slate-200 p-2 text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded px-3 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                isActive(l.href) ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
