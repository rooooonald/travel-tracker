import FormInput from "../../ui/FormInput";
import FormOpacity from "./FormOpacity";
import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import ButtonReturn from "../../ui/buttons/ButtonReturn";

import styles from "./AddTripDates.module.scss";
import { GeneralIcon } from "../../../styles/icons";

export default function AddTripDates({
  dateFromInput,
  dateToInput,
  onSwitchStep,
}) {
  const {
    value: dateFrom,
    isValid: dateFromIsValid,
    isFocused: dateFromIsFocused,
    hasError: dateFromHasError,
    valueChangeHandler: dateFromChangeHandler,
    focusHandler: dateFromFocusHandler,
    blurHandler: dateFromBlurHandler,
  } = dateFromInput;

  const {
    value: dateTo,
    isValid: dateToIsValid,
    isFocused: dateToIsFocused,
    hasError: dateToHasError,
    valueChangeHandler: dateToChangeHandler,
    focusHandler: dateToFocusHandler,
    blurHandler: dateToBlurHandler,
  } = dateToInput;

  return (
    <FormOpacity>
      <div className={styles["form-content"]}>
        <p className={styles["form-question"]}>
          What's the <span>date of departure</span>?
        </p>
        <div className={styles.row}>
          <FormInput
            id="trip-date-from"
            label="FROM"
            input={{
              type: "date",
              value: dateFrom,
              onChange: dateFromChangeHandler,
              onBlur: dateFromBlurHandler,
              onFocus: dateFromFocusHandler,
            }}
            isFocused={dateFromIsFocused}
            errorMsg={dateFromHasError && "Invalid Input"}
            className={styles["col-8"]}
          />
        </div>
        <p className={styles["form-question"]}>
          How about the <span>return date</span>?
        </p>
        <div className={styles.row}>
          <FormInput
            id="trip-date-to"
            label="TO"
            input={{
              type: "date",
              value: dateTo,
              onChange: dateToChangeHandler,
              onBlur: dateToBlurHandler,
              onFocus: dateToFocusHandler,
              min: dateFrom,
            }}
            isFocused={dateToIsFocused}
            errorMsg={dateToHasError && "Invalid Input"}
            className={styles["col-8"]}
          />
        </div>
      </div>
      <div className={styles["btn-group"]}>
        <ButtonReturn type="button" onClick={() => onSwitchStep(-1)}>
          <GeneralIcon.Left />
        </ButtonReturn>

        <ButtonPrimary
          type="button"
          disabled={!dateFromIsValid || !dateToIsValid}
          onClick={() => onSwitchStep(+1)}
        >
          <GeneralIcon.Right />
        </ButtonPrimary>
      </div>
    </FormOpacity>
  );
}
