// frontend/src/components/CalculadoraFiscal.tsx

"use client";
import { useTaxCalculator } from "@/hooks/useTaxCalculator";
import { TaxConcept } from "@/lib/taxConcepts";

type TaxConceptWithValue = TaxConcept & { value: number };

export default function CalculadoraFiscal() {
  const { base, setBase, results } = useTaxCalculator();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-2xl my-8">
      <h2 className="text-2xl font-bold mb-4">Calculadora Fiscal Avanzada</h2>
      <input
        type="number"
        min="0"
        step="0.01"
        value={base}
        onChange={(e) => setBase(parseFloat(e.target.value) || 0)}
        className="border rounded p-2 w-full mb-4 text-xl"
        placeholder="Monto base (RD$)"
      />
      <div className="grid gap-3">
        {results.map((r: TaxConceptWithValue) => (
          <div key={r.name} className="flex justify-between items-center">
            <span className="font-semibold">{r.label}:</span>
            <span className="text-violet-800 font-bold">
              RD$ {r.value.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 text-xs text-gray-400">
        Puedes agregar o quitar conceptos fiscales en el código, ¡la calculadora se adapta sola!
      </div>
    </div>
  );
}
