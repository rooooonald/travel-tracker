import { useState } from "react";
import useInput from "../../../hooks/use-input";

import { COUNTRIES } from "../../../../data/COUNTRIES";

import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import ButtonReturn from "../../ui/buttons/ButtonReturn";
import FormOpacity from "./FormOpacity";
import { checkEmpty } from "../../../lib/validations";

import styles from "./AddTripCities.module.scss";
import { GeneralIcon } from "../../../styles/icons";
import { ImCross } from "react-icons/im";

export default function AddTripCities({
  cities,
  selectedCountries,
  isCityWithoutCountry,
  onSetCities,
  onSwitchStep,
}) {
  const [country, setCountry] = useState("");
  const [countryIsFocused, setCountryIsFocused] = useState(false);

  const {
    value: cityName,
    isValid: cityNameIsValid,
    isFocused: cityNameIsFocused,
    hasError: cityNameHasError,
    valueChangeHandler: cityNameChangeHandler,
    focusHandler: cityNameFocusHandler,
    blurHandler: cityNameBlurHandler,
    resetHandler: cityNameResetHandler,
  } = useInput(checkEmpty);

  const filteredCountries = COUNTRIES.filter((country) =>
    selectedCountries.includes(country.id)
  ).map((country) => ({ value: country.id, text: country.title }));
  const countryOptions = [
    { value: "", text: "-- COUNTRY --" },
    ...filteredCountries,
  ];

  return (
    <FormOpacity>
      <div className={styles["form-content"]}>
        <p className={styles["form-question"]}>
          What <span>cities</span> are you going to?
        </p>

        <div className={styles.row}>
          <FormSelect
            id="trip-city-country"
            label="COUNTRY"
            input={{ value: country }}
            onChange={(e) => setCountry(e.target.value)}
            onFocus={() => setCountryIsFocused(true)}
            onBlur={() => setCountryIsFocused(false)}
            isFocused={countryIsFocused}
            options={countryOptions}
            className={styles["col-12"]}
            errorMsg={isCityWithoutCountry && "Please select a country"}
          />
        </div>
        <div className={styles.row}>
          <FormInput
            id="trip-city"
            label="CITY"
            input={{
              type: "text",
              value: cityName,
              onChange: cityNameChangeHandler,
              onBlur: cityNameBlurHandler,
              onFocus: cityNameFocusHandler,
              placeholder: cityNameIsFocused ? "" : "CITY",
            }}
            isFocused={cityNameIsFocused}
            errorMsg={cityNameHasError && "Invalid Input"}
            className={styles["col-8"]}
          />
          <button
            type="button"
            disabled={!country || !cityNameIsValid}
            className={styles["add-btn"]}
            onClick={() => {
              onSetCities({
                name: cityName.toLowerCase(),
                country,
              });
              cityNameResetHandler();
              setCountry("");
            }}
          >
            <GeneralIcon.Add />
          </button>
        </div>

        <div className={styles["selected-cities"]}>
          {cities.map((city, i) => (
            <button
              key={i}
              onClick={() =>
                onSetCities({ name: city.name, country: city.country })
              }
              type="button"
            >
              <ImCross className={styles.delete} />
              <img
                src={`/images/countries/${city.country}.webp`}
                alt={city.name}
              />
              <p>{city.name}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={styles["btn-group"]}>
        <ButtonReturn type="button" onClick={() => onSwitchStep(-1)}>
          <GeneralIcon.Left />
        </ButtonReturn>

        <ButtonPrimary
          type="button"
          disabled={cities.length === 0}
          onClick={() => onSwitchStep(+1)}
        >
          <GeneralIcon.Right />
        </ButtonPrimary>
      </div>
    </FormOpacity>
  );
}
