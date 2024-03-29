import { Link } from "react-router-dom";

import dateTimeFormatter from "../../lib/datetime-formatter";

import styles from "./TripItem.module.scss";

import { LazyMotion, domAnimation, m } from "framer-motion";

export default function TripItem({ trip }) {
  return (
    <LazyMotion features={domAnimation}>
      <Link to={`/trips/${trip.tripId}`}>
        <m.div
          whileHover={{ scale: 1.25, zIndex: 5 }}
          animate={{ rotate: Math.random() * 40 - 20 }}
          className={styles.wrapper}
        >
          <div className={styles.img}>
            <p>{trip.title}</p>
            <p>
              {dateTimeFormatter(trip.dateFrom, {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}{" "}
              ✈{" "}
              {dateTimeFormatter(trip.dateTo, {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>{" "}
            <img src={`/images/countries/${trip.countries[0]}.webp`} />
          </div>

          <div className={styles.content}>
            {trip.cities.map((city, i) => (
              <p key={i} className={styles.cities}>
                ✈ {city.name}
              </p>
            ))}
          </div>
        </m.div>
      </Link>
    </LazyMotion>
  );
}
