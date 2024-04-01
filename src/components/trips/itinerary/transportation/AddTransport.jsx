import { useContext, useState } from "react";
import useInput from "../../../../hooks/use-input";
import { ItineraryContext } from "../../../../store/itinerary-context";

import { addTransitMethod } from "../../../../lib/db/save";

import FormInput from "../../../ui/FormInput";
import FormSelect from "../../../ui/FormSelect";
import ButtonPrimary from "../../../ui/buttons/ButtonPrimary";
import { checkEmpty } from "../../../../lib/validations";

import styles from "./AddTransport.module.scss";
import { useMutation } from "@tanstack/react-query";

const methodOptions = [
  { value: "", text: "-- Transit Method --" },
  { value: "walk", text: "Walk" },
  { value: "drive", text: "Drive" },
  { value: "bus", text: "Bus" },
  { value: "train", text: "Train / Subway" },
  { value: "taxi", text: "Taxi" },
  { value: "bike", text: "Bike" },
];

export default function AddTransport({ placeId, onClose }) {
  const [method, setMethod] = useState("");
  const [methodIsFocused, setMethodIsFocused] = useState(false);

  const { trip, currDay } = useContext(ItineraryContext);
  const { mutate, isPending } = useMutation({
    mutationFn: addTransitMethod,
    onSuccess: () => {
      onClose();
    },
  });

  const {
    value: from,
    isValid: fromIsValid,
    isFocused: fromIsFocused,
    hasError: fromHasError,
    valueChangeHandler: fromChangeHandler,
    focusHandler: fromFocusHandler,
    blurHandler: fromBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: departTime,
    isValid: departTimeIsValid,
    isFocused: departTimeIsFocused,
    hasError: departTimeHasError,
    valueChangeHandler: departTimeChangeHandler,
    focusHandler: departTimeFocusHandler,
    blurHandler: departTimeBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: to,
    isValid: toIsValid,
    isFocused: toIsFocused,
    hasError: toHasError,
    valueChangeHandler: toChangeHandler,
    focusHandler: toFocusHandler,
    blurHandler: toBlurHandler,
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
    value: fare,
    isValid: fareIsValid,
    isFocused: fareIsFocused,
    hasError: fareHasError,
    valueChangeHandler: fareChangeHandler,
    focusHandler: fareFocusHandler,
    blurHandler: fareBlurHandler,
  } = useInput(() => true);

  const submitHandler = async (e) => {
    e.preventDefault();

    const transportObj = {
      method,
      from,
      to,
      departTime,
      arrivalTime,
      fare: +fare,
    };

    mutate({
      tripId: trip.tripId,
      placeId,
      fullItinerary: trip.itinerary,
      currDay,
      transportObj,
    });

    // await addTransitMethod(
    //   trip.tripId,
    //   placeId,
    //   trip.itinerary,
    //   currDay,
    //   transportObj
    // );

    // onClose();
  };

  const formisValid =
    method &&
    fromIsValid &&
    departTimeIsValid &&
    toIsValid &&
    arrivalTimeIsValid;

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <p className={styles["form-question"]}>
        What will you <span>take</span>?
      </p>
      <div className={styles.row}>
        <FormSelect
          id="transport-method"
          label="Transit Method"
          input={{ value: method }}
          onChange={(e) => setMethod(e.target.value)}
          onFocus={() => setMethodIsFocused(true)}
          onBlur={() => setMethodIsFocused(false)}
          isRequired={true}
          isFocused={methodIsFocused}
          options={methodOptions}
          className={styles["col-6"]}
        />
      </div>
      <p className={styles["form-question"]}>
        <span>Where</span> will you go from? And <span>when</span> are you ready
        to go?
      </p>
      <div className={styles.row}>
        <FormInput
          id="transport-from"
          label="FROM"
          input={{
            type: "text",
            value: from,
            onChange: fromChangeHandler,
            onBlur: fromBlurHandler,
            onFocus: fromFocusHandler,
            placeholder: fromIsFocused ? "" : "e.g. Shinjuku Stn.",
          }}
          isRequired={true}
          isFocused={fromIsFocused}
          errorMsg={fromHasError && "Invalid Input"}
          className={styles["col-6"]}
        />

        <FormInput
          id="transport-depart-time"
          label="DEPARTURE TIME"
          input={{
            type: "time",
            value: departTime,
            onChange: departTimeChangeHandler,
            onBlur: departTimeBlurHandler,
            onFocus: departTimeFocusHandler,
          }}
          isRequired={true}
          isFocused={departTimeIsFocused}
          errorMsg={departTimeHasError && "Invalid Input"}
          className={styles["col-4"]}
        />
      </div>
      <p className={styles["form-question"]}>
        How about your <span>destination</span> ? <span>When</span> do you
        expect to arrive?
      </p>
      <div className={styles.row}>
        <FormInput
          id="transport-to"
          label="TO"
          input={{
            type: "text",
            value: to,
            onChange: toChangeHandler,
            onBlur: toBlurHandler,
            onFocus: toFocusHandler,
            placeholder: toIsFocused ? "" : "e.g. Shibuya Stn.",
          }}
          isRequired={true}
          isFocused={toIsFocused}
          errorMsg={toHasError && "Invalid Input"}
          className={styles["col-6"]}
        />

        <FormInput
          id="transport-arrive-time"
          label="ARRIVAL TIME"
          input={{
            type: "time",
            value: arrivalTime,
            onChange: arrivalTimeChangeHandler,
            onBlur: arrivalTimeBlurHandler,
            onFocus: arrivalTimeFocusHandler,
          }}
          isRequired={true}
          isFocused={arrivalTimeIsFocused}
          errorMsg={arrivalTimeHasError && "Invalid Input"}
          className={styles["col-4"]}
        />
      </div>

      <p className={styles["form-question"]}>
        <span>How much</span> is the trip?
      </p>

      <div className={styles.row}>
        <FormInput
          id="transport-fare"
          label="FARE"
          input={{
            type: "text",
            value: fare,
            onChange: fareChangeHandler,
            onBlur: fareBlurHandler,
            onFocus: fareFocusHandler,
            placeholder: fareIsFocused ? "" : "0",
          }}
          isFocused={fareIsFocused}
          errorMsg={fareHasError && "Invalid Input"}
          className={styles["col-3"]}
        />
      </div>

      <ButtonPrimary disabled={!formisValid} className={styles["col-3"]}>
        SUBMIT
      </ButtonPrimary>
    </form>
  );
}
