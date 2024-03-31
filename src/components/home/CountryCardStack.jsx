import styles from "./CountryCardStack.module.scss";

import { LazyMotion, domAnimation, m } from "framer-motion";

export default function CountryCardStack({ activeCountry, countryName }) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={styles["country-display"]}>
        <m.div
          key={activeCountry}
          initial={{ rotate: 30 }}
          animate={{ rotate: 15 }}
          transition={{ delay: 0.1 }}
        >
          <img
            src={`/images/countries/${activeCountry}.webp`}
            alt={countryName}
          />
          <p>{countryName.toUpperCase()}</p>
        </m.div>
        <div>
          <img src={"/images/countries/AO.webp"} />
        </div>
        <div>
          <img src={"/images/countries/SA.webp"} />
        </div>
      </div>
    </LazyMotion>
  );
}
