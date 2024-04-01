import { createContext, useEffect, useState } from "react";

export const CurrencyContext = createContext({});

export default function CurrencyContextProvider({ children }) {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [rate, setRate] = useState(1);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (!fromCurrency || !toCurrency) {
      return;
    }

    const fetchRate = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}`
      );

      if (!res.ok) {
        return;
      }

      const result = await res.json();

      setRate(result.rates[toCurrency]);
      setUnit(toCurrency);
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  const resetCurrency = () => {
    setFromCurrency(null);
    setToCurrency(null);
    setRate(1);
    setUnit("");
  };

  const context = {
    rate,
    unit,
    setFromCurrency,
    setToCurrency,
    resetCurrency,
  };

  return (
    <CurrencyContext.Provider value={context}>
      {children}
    </CurrencyContext.Provider>
  );
}
