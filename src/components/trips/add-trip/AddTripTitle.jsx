import FormInput from "../../ui/FormInput";
import FormOpacity from "./FormOpacity";
import ButtonPrimary from "../../ui/buttons/ButtonPrimary";

import styles from "./AddTripTitle.module.scss";
import { GeneralIcon } from "../../../styles/icons";

export default function AddTripTitle({ titleInput, onSwitchStep }) {
  const {
    value: title,
    isValid: titleIsValid,
    isFocused: titleIsFocused,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    focusHandler: titleFocusHandler,
    blurHandler: titleBlurHandler,
  } = titleInput;

  return (
    <FormOpacity>
      <div className={styles["form-content"]}>
        <p className={styles["form-question"]}>
          What's the <span>title</span> of this trip?
        </p>
        <div className={styles.row}>
          <FormInput
            id="trip-name"
            label="TRIP TITLE"
            input={{
              type: "text",
              value: title,
              onChange: titleChangeHandler,
              onBlur: titleBlurHandler,
              onFocus: titleFocusHandler,
              placeholder: titleIsFocused ? "" : "Max 20 Characters",
            }}
            isFocused={titleIsFocused}
            errorMsg={titleHasError && "Invalid Input"}
            className={styles["col-12"]}
          />
        </div>
      </div>
      <div className={styles["btn-group"]}>
        <ButtonPrimary
          type="button"
          disabled={!titleIsValid}
          onClick={() => onSwitchStep(+1)}
        >
          <GeneralIcon.Right />
        </ButtonPrimary>
      </div>
    </FormOpacity>
  );
}
