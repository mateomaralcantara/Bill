"use client";
import Link from "next/link";

// Navbar, 100% responsive y con scroll horizontal en móvil si hay muchos links
export default function navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-40
        backdrop-blur-lg bg-white/80 border-b border-slate-200
        shadow-xl
        flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5
        transition-all duration-200
      "
      style={{
        WebkitBackdropFilter: "blur(14px)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* LOGO */}
      <Link
        href="/"
        className="flex items-center gap-1 text-[2.2rem] sm:text-[2.5rem] font-extrabold select-none tracking-tight"
        style={{
          letterSpacing: ".01em",
        }}
      >
        <span className="text-sky-700 drop-shadow-lg">Impuestos</span>
        <span className="text-fuchsia-700 pl-1 tracking-wide">RD</span>
      </Link>
      {/* MENÚ */}
      <div className="flex items-center gap-1 sm:gap-3 md:gap-5 overflow-x-auto scrollbar-hide">
        <NavButton href="/agendar" text="Agendar" />
        <NavButton href="/dashboard" text="Panel" />
        <NavButton href="/facturas" text="Facturas" />
        <NavButton href="/afiliados" text="Afiliados" />
        <NavButton href="/calculadora" text="Calculadora" />
        <NavButton href="/chat" text="IA Fiscal" />
      </div>
    </nav>
  );
}

// Botón real, visualmente pro y adaptable a mobile (mínimo ancho y transición)
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
        text-white font-bold text-base sm:text-lg px-5 sm:px-6 py-2 rounded-2xl shadow-lg
        transition-all duration-150
        hover:scale-110
        focus:ring-2 focus:ring-sky-400 ring-offset-2
        border-none outline-none
        tracking-wide
        mx-1
        whitespace-nowrap
      `}
      style={{
        minWidth: "108px",
        textAlign: "center",
        letterSpacing: ".04em",
      }}
    >
      {text}
    </Link>
  );
}
