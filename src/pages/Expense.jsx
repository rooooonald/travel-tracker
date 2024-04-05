import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { ItineraryContext } from "../store/itinerary-context";
import { CurrencyContext } from "../store/currency-context.jsx";

import ExpenseList from "../components/trips/expense/ExpenseList.jsx";
import CurrencyExchangeForm from "../components/trips/expense/CurrencyExchangeForm.jsx";
import BlankBox from "../components/ui/BlankBox.jsx";
import currencyFormatter from "../lib/currency-formatter.js";

import styles from "./Expense.module.scss";

export default function ExpensePage() {
  const { currDayItinerary } = useContext(ItineraryContext);
  const { rate, unit } = useContext(CurrencyContext);
  const { setIsAddingExpense } = useOutletContext();

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
          {currencyFormatter(totalExpense)}
        </p>
      </div>

      <CurrencyExchangeForm />
    </div>
  );
}
