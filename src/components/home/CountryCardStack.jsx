import { useEffect, useState } from "react";

import Loader from "react-js-loader";

import styles from "./CountryCardStack.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function CountryCardStack({ activeCountry, countryName }) {
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    setIsImgLoading(true);
  }, [activeCountry]);

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        <m.div
          key={activeCountry}
          initial={{ rotate: 30 }}
          animate={{ rotate: 15 }}
          transition={{ delay: 0.1 }}
          className={styles["country-card"]}
        >
          {isImgLoading && (
            <div className={styles.placeholder}>
              <img src="/images/home/stamps.webp" />
              <div className={styles["loader-container"]}>
                <Loader type="bubble-loop" size={50} />
              </div>
            </div>
          )}
          <img
            src={`/images/countries/${activeCountry}.webp`}
            alt={countryName}
            onLoad={() => setIsImgLoading(false)}
          />
          <p>{countryName.toUpperCase()}</p>
        </m.div>
        <div className={styles["country-card"]}>
          <img src={"/images/countries/AO.webp"} />
        </div>
        <div className={styles["country-card"]}>
          <img src={"/images/countries/SA.webp"} />
        </div>
      </div>
    </LazyMotion>
  );
}
