import { useContext } from "react";
import useInput from "../../../../hooks/use-input";
import { ItineraryContext } from "../../../../store/itinerary-context";
import { useMutation } from "@tanstack/react-query";

import { addAccommodation } from "../../../../lib/db/save";

import ButtonPrimary from "../../../ui/buttons/ButtonPrimary";
import FormInput from "../../../ui/FormInput";
import { checkEmpty } from "../../../../lib/validations";

import styles from "./AddAccommodation.module.scss";

export default function AddAccommodation({ onClose }) {
  const { trip, currDay } = useContext(ItineraryContext);
  const { mutate, isPending } = useMutation({
    mutationFn: addAccommodation,
    onSuccess: () => {
      onClose();
    },
  });

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
    value: price,
    isValid: priceIsValid,
    isFocused: priceIsFocused,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    focusHandler: priceFocusHandler,
    blurHandler: priceBlurHandler,
  } = useInput(checkEmpty);

  const {
    value: bookingRef,
    isFocused: bookingRefIsFocused,
    hasError: bookingRefHasError,
    valueChangeHandler: bookingRefChangeHandler,
    focusHandler: bookingRefFocusHandler,
    blurHandler: bookingRefBlurHandler,
  } = useInput(() => true);

  const submitHandler = (e) => {
    e.preventDefault();

    const accommodationObj = {
      hotelName: name,
      address,
      pricePerNight: +price,
      bookingRef,
    };

    mutate({
      tripId: trip.tripId,
      fullItinerary: trip.itinerary,
      currDay,
      accommodationObj,
    });

    // await addAccommodation(
    //   trip.tripId,
    //   trip.itinerary,
    //   currDay,
    //   accommodationObj
    // );
  };

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <p className={styles["form-question"]}>
        What's the <span>name</span> of the hotel?
      </p>
      <div className={styles.row}>
        <FormInput
          id="accommodation-name"
          label="NAME"
          input={{
            type: "text",
            value: name,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            onFocus: nameFocusHandler,

            placeholder: nameIsFocused ? "" : "NAME",
          }}
          isRequired={true}
          isFocused={nameIsFocused}
          errorMsg={nameHasError && "Invalid Input"}
          className={styles["col-6"]}
        />{" "}
        <FormInput
          id="accommodation-price"
          label="PRICE PER NIGHT"
          input={{
            type: "text",
            value: price,
            onChange: priceChangeHandler,
            onBlur: priceBlurHandler,
            onFocus: priceFocusHandler,
            placeholder: priceIsFocused ? "" : "PRICE PER NIGHT",
          }}
          isRequired={true}
          isFocused={priceIsFocused}
          errorMsg={priceHasError && "Invalid Input"}
          className={styles["col-4"]}
        />
      </div>
      <p className={styles["form-question"]}>
        Can you give us the <span>address</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="accommodation-address"
          label="ADDRESS"
          input={{
            type: "text",
            value: address,
            onChange: addressChangeHandler,
            onBlur: addressBlurHandler,
            onFocus: addressFocusHandler,
            placeholder: addressIsFocused ? "" : "ADDRESS",
          }}
          isRequired={true}
          isFocused={addressIsFocused}
          errorMsg={addressHasError && "Invalid Input"}
          className={styles["col-12"]}
        />
      </div>
      <p className={styles["form-question"]}>
        Any <span>booking reference</span>?
      </p>
      <div className={styles.row}>
        <FormInput
          id="accommodation-booking-ref"
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
        disabled={!nameIsValid || !priceIsValid || !addressIsValid}
        className={styles["col-3"]}
      >
        SUBMIT
      </ButtonPrimary>
    </form>
  );
}
