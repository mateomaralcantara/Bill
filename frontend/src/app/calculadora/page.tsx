"use client";
import { useState } from "react";

// Opciones disponibles
const impuestos = [
  { value: "itebis", label: "ITBIS (18%)" },
  { value: "irs", label: "Impuesto Sobre la Renta (ISR, 25%)" },
  { value: "retencion", label: "Retención (10%)" },
];

// Map para tasas rápidas
const tasas = {
  itebis: 0.18,
  irs: 0.25,
  retencion: 0.10,
};

export default function CalculadoraFiscal() {
  const [tipo, setTipo] = useState("itebis");
  const [monto, setMonto] = useState<number | "">("");
  const [gastos, setGastos] = useState<number | "">("");

  // Calcula el total a pagar según lógica fiscal real
  const calcularPago = () => {
    const m = typeof monto === "string" ? parseFloat(monto) || 0 : monto;
    const g = typeof gastos === "string" ? parseFloat(gastos) || 0 : gastos;
    let baseImponible = m;

    if (tipo === "itebis" || tipo === "irs") {
      baseImponible = Math.max(m - g, 0);
    }

    const porcentaje = tasas[tipo as keyof typeof tasas] || 0;
    const total = tipo === "retencion"
      ? m * porcentaje
      : baseImponible * porcentaje;

    return { baseImponible, porcentaje, total };
  };

  const { baseImponible, porcentaje, total } = calcularPago();

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-white shadow-xl my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculadora Fiscal PRO</h2>
      <label className="block mb-3">
        <span className="font-semibold">Tipo de impuesto:</span>
        <select
          className="w-full mt-2 mb-1 rounded border p-2 text-lg"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          {impuestos.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="block mb-3">
        <span className="font-semibold">Monto total (RD$):</span>
        <input
          type="number"
          min={0}
          className="w-full mt-2 mb-1 rounded border p-2 text-lg"
          value={monto}
          onChange={e => setMonto(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Ej: 500,000"
        />
      </label>

      {/* Solo pide gastos deducibles para ITBIS e ISR */}
      {(tipo === "itebis" || tipo === "irs") && (
        <label className="block mb-3">
          <span className="font-semibold">Gastos deducibles (RD$):</span>
          <input
            type="number"
            min={0}
            className="w-full mt-2 mb-1 rounded border p-2 text-lg"
            value={gastos}
            onChange={e => setGastos(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Ej: 450,000"
          />
        </label>
      )}

      <div className="mt-6 bg-gray-50 rounded-xl p-4 text-lg shadow text-center">
        <div>
          <strong>Base imponible:</strong> RD$ {baseImponible.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
        </div>
        <div>
          <strong>Porcentaje aplicado:</strong> {(porcentaje * 100).toFixed(2)}%
        </div>
        <div className="mt-3 text-2xl font-extrabold text-violet-700">
          Total a pagar: RD$ {total.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
