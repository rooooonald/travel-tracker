import { useContext, useState } from "react";
import useInput from "../../../hooks/use-input";
import { useMutation } from "@tanstack/react-query";
import { ItineraryContext } from "../../../store/itinerary-context";

import { addExpense } from "../../../lib/db/save";

import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import { checkAmount, checkEmpty } from "../../../lib/validations";

import styles from "./AddExpense.module.scss";

const categoryOptions = [
  { value: "", text: "-- Category --" },
  { value: "food", text: "Food" },
  { value: "shopping", text: "Shopping" },
  { value: "activities", text: "Activities" },
  { value: "transport", text: "Transport" },
  { value: "accommodation", text: "Accommodation" },
  { value: "miscellaneous", text: "Miscellaneous" },
];

export default function AddExpense({ onClose }) {
  const [category, setCategory] = useState("");
  const [categoryIsFocused, setCategoryIsFocused] = useState(false);
  const [categoryHasError, setCategoryHasError] = useState(false);

  const itineraryCtx = useContext(ItineraryContext);
  const { currDay, trip } = itineraryCtx;

  const { mutate, isPending } = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      onClose();
    },
  });

  const {
    value: description,
    isValid: descriptionIsValid,
    isFocused: descriptionIsFocused,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    focusHandler: descriptionFocusHandler,
    blurHandler: descriptionBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: amount,
    isValid: amountIsValid,
    isFocused: amountIsFocused,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    focusHandler: amountFocusHandler,
    blurHandler: amountBlurHandler,
  } = useInput(checkAmount);

  const submitHandler = (e) => {
    e.preventDefault();

    setCategoryHasError(false);
    if (!category) {
      setCategoryHasError(true);
      return;
    }

    const expenseObj = {
      category,
      description,
      amount: +amount,
    };

    mutate({
      tripId: trip.tripId,
      fullItinerary: trip.itinerary,
      currDay,
      expenseObj,
    });

    // await addItineraryItem(trip.tripId, trip.itinerary, currDay, itineraryObj);
    // onClose();
  };

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <p className={styles["form-question"]}>
        What's the <span>expense</span> about?
      </p>
      <div className={styles.row}>
        <FormSelect
          id="expense-category"
          label="CATEGORY"
          input={{ value: category }}
          onChange={(e) => setCategory(e.target.value)}
          onFocus={() => setCategoryIsFocused(true)}
          onBlur={() => setCategoryIsFocused(false)}
          isRequired={true}
          isFocused={categoryIsFocused}
          options={categoryOptions}
          className={styles["col-4"]}
          errorMsg={categoryHasError && "Please select a category"}
        />
      </div>
      <p className={styles["form-question"]}>
        Just a little bit more <span>description</span> ...
      </p>
      <div className={styles.row}>
        <FormInput
          id="expense-description"
          label="DESCRIPTION"
          input={{
            type: "text",
            value: description,
            onChange: descriptionChangeHandler,
            onBlur: descriptionBlurHandler,
            onFocus: descriptionFocusHandler,
            placeholder: descriptionIsFocused ? "" : "e.g. Entry Tickets",
          }}
          isRequired={true}
          isFocused={descriptionIsFocused}
          errorMsg={descriptionHasError && "Invalid Input"}
          className={styles["col-6"]}
        />
      </div>

      <p className={styles["form-question"]}>
        <span>How much</span> do you pay for it?
      </p>
      <div className={styles.row}>
        <FormInput
          id="expense-amount"
          label="AMOUNT"
          input={{
            type: "number",
            value: amount,
            onChange: amountChangeHandler,
            onBlur: amountBlurHandler,
            onFocus: amountFocusHandler,
          }}
          isFocused={amountIsFocused}
          isRequired={true}
          errorMsg={amountHasError && "Invalid Amount"}
          className={styles["col-4"]}
        />
      </div>

      <ButtonPrimary
        disabled={!descriptionIsValid || !amountIsValid || !category}
        className={styles["col-3"]}
      >
        SUBMIT
      </ButtonPrimary>
    </form>
  );
}
