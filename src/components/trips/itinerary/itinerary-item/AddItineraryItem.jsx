import { useContext, useState } from "react";
import useInput from "../../../../hooks/use-input";

import { addItineraryItem } from "../../../../lib/db/save";

import FormInput from "../../../ui/FormInput";
import FormSelect from "../../../ui/FormSelect";
import ButtonPrimary from "../../../ui/buttons/ButtonPrimary";
import { checkEmpty } from "../../../../lib/validations";

import styles from "./AddItineraryItem.module.scss";
import { ItineraryContext } from "../../../../store/itinerary-context";

const categoryOptions = [
  { value: "", text: "-- Category --" },
  { value: "dining", text: "Dining" },
  { value: "shopping", text: "Shopping" },
  { value: "sightseeing", text: "Sightseeing" },
];

let hourOptions = [{ value: null, text: "HRS" }];
for (let i = 0; i < 24; i++) {
  hourOptions.push({ value: i, text: i });
}

let minuteOptions = [{ value: null, text: "MINS" }];
for (let i = 0; i < 60; i += 5) {
  minuteOptions.push({ value: i, text: i });
}

export default function AddItineraryItem({ onClose }) {
  const [category, setCategory] = useState("");
  const [categoryIsFocused, setCategoryIsFocused] = useState(false);
  const [categoryHasError, setCategoryHasError] = useState(false);
  const [hour, setHour] = useState("");
  const [hourIsFocused, setHourIsFocused] = useState(false);
  const [minute, setMinute] = useState("");
  const [minuteIsFocused, setMinuteIsFocused] = useState(false);

  const itineraryCtx = useContext(ItineraryContext);
  const { currDay, trip } = itineraryCtx;

  const {
    value: name,
    isValid: nameIsValid,
    isFocused: nameIsFocused,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    focusHandler: nameFocusHandler,
    blurHandler: nameBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: address,
    isValid: addressIsValid,
    isFocused: addressIsFocused,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    focusHandler: addressFocusHandler,
    blurHandler: addressBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: arrivalTime,
    isValid: arrivalTimeIsValid,
    isFocused: arrivalTimeIsFocused,
    hasError: arrivalTimeHasError,
    valueChangeHandler: arrivalTimeChangeHandler,
    focusHandler: arrivalTimeFocusHandler,
    blurHandler: arrivalTimeBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: bookingRef,
    isValid: bookingRefIsValid,
    isFocused: bookingRefIsFocused,
    hasError: bookingRefHasError,
    valueChangeHandler: bookingRefChangeHandler,
    focusHandler: bookingRefFocusHandler,
    blurHandler: bookingRefBlurHandler,
  } = useInput(() => true);

  const submitHandler = async (e) => {
    e.preventDefault();

    setCategoryHasError(false);
    if (!category) {
      setCategoryHasError(true);
      return;
    }

    const itineraryObj = {
      category,
      name,
      address,
      arrivalTime,
      stayTime: +hour * 60 + +minute,
      bookingRef,
    };

    await addItineraryItem(trip.tripId, trip.itinerary, currDay, itineraryObj);
    onClose();
  };

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <p className={styles["form-question"]}>
        <span>Where</span> will you go?
      </p>
      <div className={styles.row}>
        <FormSelect
          id="itinerary-category"
          input={{ value: category }}
          onChange={(e) => setCategory(e.target.value)}
          onFocus={() => setCategoryIsFocused(true)}
          onBlur={() => setCategoryIsFocused(false)}
          isFocused={categoryIsFocused}
          options={categoryOptions}
          className={styles["col-4"]}
          errorMsg={categoryHasError && "Please select a category"}
        />

        <FormInput
          id="itinerary-name"
          label="NAME OF PLACE"
          input={{
            type: "text",
            value: name,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            onFocus: nameFocusHandler,
            placeholder: nameIsFocused ? "" : "NAME OF PLACE",
          }}
          isFocused={nameIsFocused}
          errorMsg={nameHasError && "Invalid Input"}
          className={styles["col-6"]}
        />
      </div>
      <p className={styles["form-question"]}>
        What's the <span>address</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="itinerary-address"
          label="ADDRESS"
          input={{
            type: "text",
            value: address,
            onChange: addressChangeHandler,
            onBlur: addressBlurHandler,
            onFocus: addressFocusHandler,
            placeholder: addressIsFocused ? "" : "ADDRESS",
          }}
          isFocused={addressIsFocused}
          errorMsg={addressHasError && "Invalid Input"}
          className={styles["col-12"]}
        />
      </div>

      <p className={styles["form-question"]}>
        What <span>time</span> do you plan to arrive? And <span>how long</span>{" "}
        will you stay?
      </p>
      <div className={styles.row}>
        <FormInput
          id="itinerary-arrive-time"
          label="ARRIVAL TIME"
          input={{
            type: "time",
            value: arrivalTime,
            onChange: arrivalTimeChangeHandler,
            onBlur: arrivalTimeBlurHandler,
            onFocus: arrivalTimeFocusHandler,
          }}
          isFocused={arrivalTimeIsFocused}
          errorMsg={arrivalTimeHasError && "Invalid Time"}
          className={styles["col-4"]}
        />
        <FormSelect
          id="itinerary-stay-hour"
          label="HRS"
          input={{ value: hour }}
          onChange={(e) => setHour(e.target.value)}
          onFocus={() => setHourIsFocused(true)}
          onBlur={() => setHourIsFocused(false)}
          isFocused={hourIsFocused}
          options={hourOptions}
          className={styles["col-2"]}
        />
        <FormSelect
          id="itinerary-stay-minutes"
          label="MINS"
          input={{ value: minute }}
          onChange={(e) => setMinute(e.target.value)}
          onFocus={() => setMinuteIsFocused(true)}
          onBlur={() => setMinuteIsFocused(false)}
          isFocused={minuteIsFocused}
          options={minuteOptions}
          className={styles["col-2"]}
        />
      </div>
      <p className={styles["form-question"]}>
        Any <span>booking reference</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="itinerary-booking-ref"
          label="BOOKING REFERENCE"
          input={{
            type: "text",
            value: bookingRef,
            onChange: bookingRefChangeHandler,
            onBlur: bookingRefBlurHandler,
            onFocus: bookingRefFocusHandler,
            placeholder: bookingRefIsFocused ? "" : "BOOKING REFERENCE",
          }}
          isFocused={bookingRefIsFocused}
          errorMsg={bookingRefHasError && "Invalid Input"}
          className={styles["col-6"]}
        />
      </div>
      <ButtonPrimary
        disabled={
          !nameIsValid || !addressIsValid || !arrivalTimeIsValid || !category
        }
        className={styles["col-3"]}
      >
        SUBMIT
      </ButtonPrimary>
    </form>
  );
}
