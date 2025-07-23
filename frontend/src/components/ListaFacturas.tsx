// frontend/src/components/ListaFacturas.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Factura = { name: string; url: string };

export default function ListaFacturas() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/facturas/listar")
      .then((r) => r.json())
      .then((data) => setFacturas(data.files || []));
  }, []);

  const borrar = async (filename: string) => {
    setMsg("Eliminando...");
    const res = await fetch(
      `http://localhost:8000/api/facturas/borrar?filename=${encodeURIComponent(filename)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setFacturas((facturas) => facturas.filter((f) => f.name !== filename));
      setMsg("¡Eliminado!");
    } else {
      setMsg("Error al eliminar.");
    }
    setTimeout(() => setMsg(""), 1200);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-xl max-w-lg mx-auto my-6">
      <h3 className="text-xl font-bold mb-2">Facturas subidas</h3>
      {facturas.length === 0 && <p className="text-gray-500">No hay facturas.</p>}
      <ul className="space-y-4">
        {facturas.map((f) => (
          <li key={f.name} className="flex items-center gap-3">
            <div className="w-28 h-20 relative">
              <Image
                src={f.url}
                alt={f.name}
                fill
                className="rounded shadow object-cover"
                unoptimized
                sizes="112px"
              />
            </div>
            <span className="text-xs truncate max-w-[120px]" title={f.name}>
              {f.name}
            </span>
            <button
              className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
              onClick={() => borrar(f.name)}
              type="button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {msg && <div className="mt-2 text-sm text-violet-700">{msg}</div>}
    </div>
  );
}
