// frontend/src/hooks/useTaxCalculator.ts

import { useState } from "react";
import { taxConcepts } from "../lib/taxConcepts";

export function useTaxCalculator() {
  const [base, setBase] = useState<number>(0);

  const calculate = () => {
    return taxConcepts.map((concept) => ({
      ...concept,
      value: concept.apply(base),
    }));
  };

  return {
    base,
    setBase,
    results: calculate(),
  };
}
