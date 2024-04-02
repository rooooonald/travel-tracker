import { useContext } from "react";
import { CurrencyContext } from "../../../store/currency-context";
import { useMutation } from "@tanstack/react-query";
import { ItineraryContext } from "../../../store/itinerary-context";

import { removeExpense } from "../../../lib/db/delete";

import ButtonRemove from "../../ui/buttons/ButtonRemove";
import currencyFormatter from "../../../lib/currency-formatter";

import styles from "./ExpenseItem.module.scss";

export default function ExpenseItem({ expense }) {
  const { trip, currDay } = useContext(ItineraryContext);
  const { rate } = useContext(CurrencyContext);

  const { expenseId, description, amount } = expense;

  const { mutate, isPending } = useMutation({
    mutationFn: removeExpense,
  });

  const removeExpenseHandler = () => {
    mutate({
      tripId: trip.tripId,
      fullItinerary: trip.itinerary,
      currDay,
      expenseId,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <ButtonRemove
          onClick={removeExpenseHandler}
          className={styles["remove-btn"]}
        />
        <p>{description}</p>
      </div>
      <p>{currencyFormatter(amount * rate)}</p>
    </div>
  );
}
