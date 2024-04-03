import { useEffect, useState } from "react";

import { COUNTRIES } from "../../../../data/COUNTRIES";
import { getVisitedCountries } from "../../../lib/db/load";

import MapCountry from "./MapCountry";

import styles from "./WorldMap.module.scss";

export default function WorldMap({ onChangeCountry }) {
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    (async () => {
      let countries = await getVisitedCountries();
      setVisitedCountries(countries);
    })();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        <img src="/images/home/stamps.svg" /> <p>YOUR TRAVEL MAP</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 1008 651"
      >
        {COUNTRIES.map((country) => (
          <MapCountry
            key={country.id}
            id={country.id}
            title={country.title}
            d={country.d}
            isVisited={visitedCountries.includes(country.id)}
            onChangeCountry={onChangeCountry}
          />
        ))}
      </svg>
    </section>
  );
}
