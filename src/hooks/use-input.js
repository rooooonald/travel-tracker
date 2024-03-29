import { useState } from "react";

export default function useInput(validate, validateOptions, defaultValue) {
  const [value, setValue] = useState(defaultValue || "");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValid = validate(value, validateOptions);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const resetHandler = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    isFocused,
    hasError,
    valueChangeHandler,
    focusHandler,
    blurHandler,
    resetHandler,
  };
}
