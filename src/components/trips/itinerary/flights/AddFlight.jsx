import { useContext } from "react";
import { ItineraryContext } from "../../../../store/itinerary-context";
import useInput from "../../../../hooks/use-input";
import { useMutation } from "@tanstack/react-query";

import { addFlight } from "../../../../lib/db/save";

import FormInput from "../../../ui/FormInput";
import ButtonPrimary from "../../../ui/buttons/ButtonPrimary";
import {
  checkDate,
  checkEmpty,
  checkFlightNum,
} from "../../../../lib/validations";

import styles from "./AddFlight.module.scss";

export default function AddFlight({ mode, onClose }) {
  const { trip } = useContext(ItineraryContext);
  const { mutate, isPending } = useMutation({
    mutationFn: addFlight,
    onSuccess: () => {
      onClose();
    },
  });

  const {
    value: airline,
    isValid: airlineIsValid,
    isFocused: airlineIsFocused,
    hasError: airlineHasError,
    valueChangeHandler: airlineChangeHandler,
    focusHandler: airlineFocusHandler,
    blurHandler: airlineBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: flightNumber,
    isValid: flightNumberIsValid,
    isFocused: flightNumberIsFocused,
    hasError: flightNumberHasError,
    valueChangeHandler: flightNumberChangeHandler,
    focusHandler: flightNumberFocusHandler,
    blurHandler: flightNumberBlurHandler,
  } = useInput(checkFlightNum);

  const {
    value: airportFrom,
    isValid: airportFromIsValid,
    isFocused: airportFromIsFocused,
    hasError: airportFromHasError,
    valueChangeHandler: airportFromChangeHandler,
    focusHandler: airportFromFocusHandler,
    blurHandler: airportFromBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: terminalFrom,
    isValid: terminalFromIsValid,
    isFocused: terminalFromIsFocused,
    hasError: terminalFromHasError,
    valueChangeHandler: terminalFromChangeHandler,
    focusHandler: terminalFromFocusHandler,
    blurHandler: terminalFromBlurHandler,
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
    value: airportTo,
    isValid: airportToIsValid,
    isFocused: airportToIsFocused,
    hasError: airportToHasError,
    valueChangeHandler: airportToChangeHandler,
    focusHandler: airportToFocusHandler,
    blurHandler: airportToBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: terminalTo,
    isValid: terminalToIsValid,
    isFocused: terminalToIsFocused,
    hasError: terminalToHasError,
    valueChangeHandler: terminalToChangeHandler,
    focusHandler: terminalToFocusHandler,
    blurHandler: terminalToBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: arrivalTime,
    isValid: arrivalTimeIsValid,
    isFocused: arrivalTimeIsFocused,
    hasError: arrivalTimeHasError,
    valueChangeHandler: arrivalTimeChangeHandler,
    focusHandler: arrivalTimeFocusHandler,
    blurHandler: arrivalTimeBlurHandler,
  } = useInput((arrivalTime) =>
    checkDate(arrivalTime, { dateFrom: departTime })
  );

  const formIsValid =
    airlineIsValid &&
    flightNumberIsValid &&
    airportFromIsValid &&
    terminalFromIsValid &&
    departTimeIsValid &&
    airportToIsValid &&
    terminalToIsValid &&
    arrivalTimeIsValid;

  const submitHandler = (e) => {
    e.preventDefault();

    const flightObj = {
      airline,
      flightNumber,
      from: {
        airport: airportFrom.toUpperCase(),
        terminal: terminalFrom,
        departTime,
      },
      to: {
        airport: airportTo.toUpperCase(),
        terminal: terminalTo,
        arrivalTime,
      },
    };

    mutate({ mode, tripId: trip.tripId, flightObj });

    // await addFlight(mode, trip.tripId, flightObj);
    // onClose();
  };

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <p className={styles["form-question"]}>
        Tell us more about your{" "}
        <span>{mode === "depart" ? "departing" : "return"} flight</span> ...
      </p>
      <div className={styles.row}>
        <FormInput
          id="flight-airline"
          label="AIRLINE"
          input={{
            type: "text",
            value: airline,
            onChange: airlineChangeHandler,
            onBlur: airlineBlurHandler,
            onFocus: airlineFocusHandler,
            placeholder: airlineIsFocused ? "" : "AIRLINE",
          }}
          isRequired={true}
          isFocused={airlineIsFocused}
          errorMsg={airlineHasError && "Invalid Input"}
          className={styles["col-6"]}
        />
        <FormInput
          id="flight-number"
          label="FLIGHT NO."
          input={{
            type: "text",
            value: flightNumber,
            onChange: flightNumberChangeHandler,
            onBlur: flightNumberBlurHandler,
            onFocus: flightNumberFocusHandler,
            placeholder: flightNumberIsFocused ? "" : "FLIGHT NO.",
          }}
          isRequired={true}
          isFocused={flightNumberIsFocused}
          errorMsg={flightNumberHasError && "Invalid Input"}
          className={styles["col-6"]}
        />
      </div>
      <p className={styles["form-question"]}>
        Where are you <span>departing from</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="flight-depart-airport"
          label="AIRPORT CODE"
          input={{
            type: "text",
            value: airportFrom,
            onChange: airportFromChangeHandler,
            onBlur: airportFromBlurHandler,
            onFocus: airportFromFocusHandler,
            placeholder: airportFromIsFocused ? "" : "AIRPORT CODE (e.g. YYZ)",
          }}
          isRequired={true}
          isFocused={airportFromIsFocused}
          errorMsg={airportFromHasError && "Invalid Input"}
          className={styles["col-8"]}
        />
        <FormInput
          id="flight-depart-terminal"
          label="TERMINAL"
          input={{
            type: "text",
            value: terminalFrom,
            onChange: terminalFromChangeHandler,
            onBlur: terminalFromBlurHandler,
            onFocus: terminalFromFocusHandler,
            placeholder: terminalFromIsFocused ? "" : "TERMINAL",
          }}
          isRequired={true}
          isFocused={terminalFromIsFocused}
          errorMsg={terminalFromHasError && "Invalid Input"}
          className={styles["col-4"]}
        />
      </div>

      <div className={styles.row}>
        <p style={{ textAlign: "right" }} className={styles["col-4"]}>
          Departure Time
        </p>
        <FormInput
          id="flight-depart-time"
          label="DEPARTURE"
          input={{
            type: "datetime-local",
            value: departTime,
            onChange: departTimeChangeHandler,
            onBlur: departTimeBlurHandler,
            onFocus: departTimeFocusHandler,
          }}
          isRequired={true}
          isFocused={departTimeIsFocused}
          errorMsg={departTimeHasError && "Invalid Input"}
          className={styles["col-8"]}
        />
      </div>
      <p className={styles["form-question"]}>
        Which airport are you <span>landing</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="flight-arrive-airport"
          label="AIRPORT CODE"
          input={{
            type: "text",
            value: airportTo,
            onChange: airportToChangeHandler,
            onBlur: airportToBlurHandler,
            onFocus: airportToFocusHandler,
            placeholder: airportToIsFocused ? "" : "AIRPORT CODE (e.g. HKG)",
          }}
          isRequired={true}
          isFocused={airportToIsFocused}
          errorMsg={airportToHasError && "Invalid Input"}
          className={styles["col-8"]}
        />
        <FormInput
          id="flight-arrive-terminal"
          label="TERMINAL"
          input={{
            type: "text",
            value: terminalTo,
            onChange: terminalToChangeHandler,
            onBlur: terminalToBlurHandler,
            onFocus: terminalToFocusHandler,
            placeholder: terminalToIsFocused ? "" : "TERMINAL",
          }}
          isRequired={true}
          isFocused={terminalToIsFocused}
          errorMsg={terminalToHasError && "Invalid Input"}
          className={styles["col-4"]}
        />
      </div>
      <div className={styles.row}>
        <p style={{ textAlign: "right" }} className={styles["col-4"]}>
          Arrival Time
        </p>
        <FormInput
          id="flight-arrive-time"
          label="DEPARTURE"
          input={{
            type: "datetime-local",
            value: arrivalTime,
            onChange: arrivalTimeChangeHandler,
            onBlur: arrivalTimeBlurHandler,
            onFocus: arrivalTimeFocusHandler,
          }}
          isRequired={true}
          isFocused={arrivalTimeIsFocused}
          errorMsg={arrivalTimeHasError && "Invalid Input"}
          className={styles["col-8"]}
        />
      </div>

      <ButtonPrimary disabled={!formIsValid} className={styles["col-3"]}>
        SUBMIT
      </ButtonPrimary>
    </form>
  );
}
