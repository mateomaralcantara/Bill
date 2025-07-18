"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-40
        backdrop-blur-lg bg-white/80 border-b border-slate-200
        shadow-xl
        transition-all duration-200
        flex items-center justify-between px-7 py-5
      "
      style={{
        WebkitBackdropFilter: "blur(14px)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* LOGO */}
      <Link
        href="/"
        className="flex items-center gap-1 text-[2.5rem] font-extrabold select-none tracking-tight"
        style={{
          letterSpacing: ".01em",
        }}
      >
        <span className="text-sky-700 drop-shadow-lg">Impuestos</span>
        <span className="text-fuchsia-700 pl-1 tracking-wide">RD</span>
      </Link>
      {/* MENÚ */}
      <div className="flex items-center gap-3 md:gap-5">
        <NavButton href="/agendar" text="Agendar" />
        <NavButton href="/dashboard" text="Panel" />
        <NavButton href="/facturas" text="Facturas" />
        <NavButton href="/afiliados" text="Afiliados" />
        <NavButton href="/chat" text="IA Fiscal" />
      </div>
    </nav>
  );
}

// Botón real, azul, visual power y separación
function NavButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className={`
        bg-gradient-to-br from-sky-600 to-blue-700
        hover:from-sky-700 hover:to-fuchsia-700
        text-white font-bold text-lg px-6 py-2 rounded-2xl shadow-lg
        transition-all duration-150
        hover:scale-110
        focus:ring-2 focus:ring-sky-400 ring-offset-2
        border-none outline-none
        tracking-wide
        mx-1
      `}
      style={{
        minWidth: "110px",
        textAlign: "center",
        letterSpacing: ".04em",
      }}
    >
      {text}
    </Link>
  );
}
