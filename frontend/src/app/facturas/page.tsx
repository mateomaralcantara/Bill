"use client";
import SubirFactura from "@/components/SubirFactura";
import CamaraFactura from "@/components/CamaraFactura";
import { useState } from "react";

export default function FacturasPage() {
  const [modo, setModo] = useState<"archivo" | "camara">("archivo");

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold mb-7 text-center glow-anim">
        Subir Factura
      </h1>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`btn ${modo === "archivo" ? "bg-sky-800 text-white" : "bg-white text-sky-900 border"}`}
          onClick={() => setModo("archivo")}
        >
          Subir archivo o PDF
        </button>
        <button
          className={`btn ${modo === "camara" ? "bg-sky-800 text-white" : "bg-white text-sky-900 border"}`}
          onClick={() => setModo("camara")}
        >
          Usar Cámara
        </button>
      </div>
      {modo === "archivo" && <SubirFactura />}
      {modo === "camara" && <CamaraFactura />}
    </main>
  );
}
