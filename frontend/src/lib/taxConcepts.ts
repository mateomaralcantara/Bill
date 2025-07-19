// frontend/src/lib/taxConcepts.ts

export type TaxConcept = {
  name: string;             // clave interna
  label: string;            // descripción legible
  rate: number;             // tasa decimal, ej: 0.18 = 18%
  apply: (base: number) => number; // función de cálculo
};

// Arreglo central de conceptos tributarios (solo agrega aquí para crecer la calculadora)
export const taxConcepts: TaxConcept[] = [
  {
    name: "itebis",
    label: "ITBIS (18%)",
    rate: 0.18,
    apply: (base) => base * 0.18,
  },
  {
    name: "retencion",
    label: "Retención (10%)",
    rate: 0.10,
    apply: (base) => base * 0.10,
  },
  {
    name: "irs",
    label: "Impuesto Sobre la Renta (IRS, 25%)",
    rate: 0.25,
    apply: (base) => base * 0.25,
  },
  // Puedes agregar aquí más conceptos: ITBIS reducido, retención profesional, etc.
];
