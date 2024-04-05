import { MdCurrencyExchange } from "react-icons/md";
import FormSelect from "../../ui/FormSelect";
import styles from "./CurrencyExchangeForm.module.scss";
import { useContext, useState } from "react";
import { CurrencyContext } from "../../../store/currency-context";
import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import ButtonReturn from "../../ui/buttons/ButtonReturn";

const currencyOptions = [
  { value: "", text: "-- Currency --" },
  { value: "USD", text: "US Dollars (US$)" },
  { value: "EUR", text: "Euros (€)" },
  { value: "JPY", text: "Japanese Yen (¥)" },
  { value: "GBP", text: "British Pounds (£)" },
  { value: "AUD", text: "Australian Dollars (A$)" },
  { value: "CAD", text: "Canadian Dollars (CA$)" },
  { value: "CHF", text: "Swiss Francs (CHF)" },
  { value: "CNY", text: "Chinese Yuan (CN¥)" },
  { value: "SEK", text: "Swedish Krona (kr)" },
  { value: "NZD", text: "New Zealand Dollars (NZ$)" },
  { value: "KRW", text: "South Korean Won (₩)" },
  { value: "SGD", text: "Singapore Dollars (SGD$)" },
  { value: "NOK", text: "Norwegian Krone (kr)" },
  { value: "MXN", text: "Mexican Pesos (MXN$)" },
  { value: "INR", text: "Indian Rupees (₹)" },
  { value: "RUB", text: "Russian Ruble (₽)" },
  { value: "ZAR", text: "South African Rand (R)" },
  { value: "BRL", text: "Brazilian Real (R$)" },
  { value: "TRY", text: "Turkish Lira (TRY)" },
  { value: "HKD", text: "Hong Kong Dollars (HK$)" },
  { value: "IDR", text: "Indonesian Rupiah (Rp)" },
  { value: "ILS", text: "Israeli New Shekel (₪)" },
  { value: "PLN", text: "Polish Zloty (zł)" },
  { value: "THB", text: "Thai Baht (฿)" },
  { value: "DKK", text: "Danish Krone (kr)" },
  { value: "CZK", text: "Czech Koruna (Kč)" },
  { value: "HUF", text: "Hungarian Forint (Ft)" },
  { value: "BGN", text: "Bulgarian Lev (лв)" },
  { value: "RON", text: "Romanian Leu (lei)" },
  { value: "ISK", text: "Icelandic Króna (kr)" },
  { value: "PHP", text: "Philippine Pesos (₱)" },
  { value: "MYR", text: "Malaysian Ringgit (RM)" },
];

export default function CurrencyExchangeForm() {
  const {
    setFromCurrency: fromCurr,
    setToCurrency: toCurr,
    resetCurrency,
  } = useContext(CurrencyContext);
  const [fromCurrency, setFromCurrency] = useState("");
  const [fromCurrencyIsFocused, setFromCurrencyIsFocused] = useState(false);
  const [toCurrency, setToCurrency] = useState("");
  const [toCurrencyIsFocused, setToCurrencyIsFocused] = useState();

  const submitHandler = () => {
    if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
      return;
    }

    fromCurr(fromCurrency);
    toCurr(toCurrency);
  };

  const resetHandler = () => {
    resetCurrency();
    setFromCurrency("");
    setFromCurrencyIsFocused(false);
    setToCurrency("");
    setToCurrencyIsFocused(false);
  };

  return (
    <form className={styles["exchange-form"]}>
      <div className={styles["exchange-form-title"]}>CURRENCY EXCHANGE</div>

      <div className={styles.row}>
        <div className={styles["currency-input-group"]}>
          <p>LOCAL CURRENCY</p>
          <FormSelect
            id="transport-method"
            label="FROM"
            input={{ value: fromCurrency }}
            onChange={(e) => setFromCurrency(e.target.value)}
            onFocus={() => setFromCurrencyIsFocused(true)}
            onBlur={() => setFromCurrencyIsFocused(false)}
            isRequired={true}
            isFocused={fromCurrencyIsFocused}
            options={currencyOptions}
          />
        </div>
        <MdCurrencyExchange />
        <div className={styles["currency-input-group"]}>
          <p>YOUR CURRENCY</p>
          <FormSelect
            id="transport-method"
            label="TO"
            input={{ value: toCurrency }}
            onChange={(e) => setToCurrency(e.target.value)}
            onFocus={() => setToCurrencyIsFocused(true)}
            onBlur={() => setToCurrencyIsFocused(false)}
            isRequired={true}
            isFocused={toCurrencyIsFocused}
            options={currencyOptions}
          />
        </div>
      </div>

      <div className={styles["btn-group"]}>
        <ButtonPrimary
          type="button"
          onClick={submitHandler}
          disabled={!fromCurrency || !toCurrency || fromCurrency === toCurrency}
        >
          Submit
        </ButtonPrimary>
        <ButtonReturn type="button" onClick={resetHandler}>
          Reset
        </ButtonReturn>
      </div>
    </form>
  );
}
