import { useContext, useState } from "react";
import { ItineraryContext } from "../store/itinerary-context";
import { CurrencyContext } from "../store/currency-context.jsx";

import ExpenseList from "../components/trips/expense/ExpenseList.jsx";
import FormSelect from "../components/ui/FormSelect.jsx";
import ButtonPrimary from "../components/ui/buttons/ButtonPrimary.jsx";

import styles from "./Expense.module.scss";
import { MdCurrencyExchange } from "react-icons/md";
import BlankBox from "../components/ui/BlankBox.jsx";
import { useOutletContext } from "react-router-dom";
import ButtonReturn from "../components/ui/buttons/ButtonReturn.jsx";

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

export default function ExpensePage() {
  const { currDayItinerary } = useContext(ItineraryContext);
  const {
    setFromCurrency: fromCurr,
    setToCurrency: toCurr,
    resetCurrency,
    rate,
    unit,
  } = useContext(CurrencyContext);
  const { setIsAddingExpense } = useOutletContext();

  const [fromCurrency, setFromCurrency] = useState("");
  const [fromCurrencyIsFocused, setFromCurrencyIsFocused] = useState(false);
  const [toCurrency, setToCurrency] = useState("");
  const [toCurrencyIsFocused, setToCurrencyIsFocused] = useState();

  const categorizedExpenses = {};
  currDayItinerary.expenses?.forEach((expense) => {
    if (!categorizedExpenses[expense.category]) {
      categorizedExpenses[expense.category] = [];
    }
    categorizedExpenses[expense.category].push(expense);
  });

  const foodList = categorizedExpenses["food"];
  const shoppingList = categorizedExpenses["shopping"];
  const activitiesList = categorizedExpenses["activities"];
  const transportList = categorizedExpenses["transport"];
  const accommodationList = categorizedExpenses["accommodation"];
  const miscellaneousList = categorizedExpenses["miscellaneous"];

  const sum = (acc, curr) => acc + Number((curr.amount * rate).toFixed(2));

  const foodTotalAmount = foodList?.reduce(sum, 0) || 0;
  const shoppingTotalAmount = shoppingList?.reduce(sum, 0) || 0;
  const activitiesTotalAmount = activitiesList?.reduce(sum, 0) || 0;
  const transportTotalAmount = transportList?.reduce(sum, 0) || 0;
  const accommodationTotalAmount = accommodationList?.reduce(sum, 0) || 0;
  const miscellaneousTotalAmount = miscellaneousList?.reduce(sum, 0) || 0;

  const totalExpense =
    foodTotalAmount +
    shoppingTotalAmount +
    activitiesTotalAmount +
    transportTotalAmount +
    accommodationTotalAmount +
    miscellaneousTotalAmount;

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

  if (totalExpense <= 0) {
    return (
      <>
        <BlankBox
          className={styles.blank}
          onClick={() => setIsAddingExpense(true)}
        >
          <p>ADD EXPENSE</p>
        </BlankBox>
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      {foodList && foodList.length !== 0 && (
        <ExpenseList
          category="food"
          list={foodList}
          totalAmount={foodTotalAmount}
        />
      )}
      {shoppingList && shoppingList.length !== 0 && (
        <ExpenseList
          category="shopping"
          list={shoppingList}
          totalAmount={shoppingTotalAmount}
        />
      )}
      {activitiesList && activitiesList.length !== 0 && (
        <ExpenseList
          category="activities"
          list={activitiesList}
          totalAmount={activitiesTotalAmount}
        />
      )}
      {transportList && transportList.length !== 0 && (
        <ExpenseList
          category="transport"
          list={transportList}
          totalAmount={transportTotalAmount}
        />
      )}
      {accommodationList && accommodationList.length !== 0 && (
        <ExpenseList
          category="accommodation"
          list={accommodationList}
          totalAmount={accommodationTotalAmount}
        />
      )}
      {miscellaneousList && miscellaneousList.length !== 0 && (
        <ExpenseList
          category="miscellaneous"
          list={miscellaneousList}
          totalAmount={miscellaneousTotalAmount}
        />
      )}

      <div className={styles.total}>
        <p>TOTAL</p>{" "}
        <p>
          {unit}
          {totalExpense.toFixed(2)}
        </p>
      </div>

      <form className={styles["exchange-form"]}>
        <div className={styles["exchange-form-title"]}>CURRENCY EXCHANGE</div>
        <div className={styles.row}>
          <p>LOCAL CURRENCY</p>
          <p>YOUR CURRENCY</p>
        </div>
        <div className={styles.row}>
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
            className={styles["col-6"]}
          />
          <MdCurrencyExchange />
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
            className={styles["col-6"]}
          />
        </div>

        <div className={styles["btn-group"]}>
          <ButtonPrimary
            type="button"
            className={styles["col-3"]}
            onClick={submitHandler}
            disabled={
              !fromCurrency || !toCurrency || fromCurrency === toCurrency
            }
          >
            Submit
          </ButtonPrimary>
          <ButtonReturn
            type="button"
            className={styles["col-3"]}
            onClick={resetHandler}
          >
            Reset
          </ButtonReturn>
        </div>
      </form>
    </div>
  );
}
