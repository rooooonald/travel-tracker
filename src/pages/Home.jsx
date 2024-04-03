import { useState } from "react";

import { COUNTRIES } from "../../data/COUNTRIES";

import WorldMap from "../components/home/world-map/WorldMap";
import CountryCardStack from "../components/home/CountryCardStack";

import styles from "./Home.module.scss";

export default function HomePage() {
  const [activeCountry, setActiveCountry] = useState(
    COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].id
  );
  const { title } = COUNTRIES.find((country) => country.id === activeCountry);

  return (
    <main className={styles.wrapper}>
      <WorldMap onChangeCountry={setActiveCountry} />
      <CountryCardStack activeCountry={activeCountry} countryName={title} />
    </main>
  );
}
