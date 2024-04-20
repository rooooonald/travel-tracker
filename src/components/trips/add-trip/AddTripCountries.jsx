import { COUNTRIES } from "../../../../data/COUNTRIES";

import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import ButtonReturn from "../../ui/buttons/ButtonReturn";
import FormOpacity from "./FormOpacity";

import styles from "./AddTripCountries.module.scss";
import { GeneralIcon } from "../../../styles/icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const sortedCountries = COUNTRIES.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
});

export default function AddTripCountries({
  selectedCountries,
  onSelect,
  onSwitchStep,
}) {
  return (
    <FormOpacity>
      <div className={styles["form-content"]}>
        <p className={styles["form-question"]}>
          WHAT <span>COUNTRIES</span> ARE YOU GOING TO?
        </p>
        {sortedCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => onSelect(country.id)}
            type="button"
            className={
              selectedCountries.includes(country.id) ? styles.active : null
            }
          >
            <FaMapMarkerAlt className={styles.marker} />
            <img
              src={`/images/countries/icons/${country.id}.webp`}
              alt={country.title}
            />
            <p>{country.title}</p>
          </button>
        ))}
      </div>
      <div className={styles["btn-group"]}>
        <ButtonReturn type="button" onClick={() => onSwitchStep(-1)}>
          <GeneralIcon.Left />
        </ButtonReturn>

        <ButtonPrimary
          type="button"
          disabled={selectedCountries.length <= 0}
          onClick={() => onSwitchStep(+1)}
        >
          <GeneralIcon.Right />
        </ButtonPrimary>
      </div>
    </FormOpacity>
  );
}
