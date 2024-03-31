import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../lib/db";
import { removeTrip } from "../../lib/db/delete";

import ButtonRemove from "../ui/buttons/ButtonRemove";
import dateTimeFormatter from "../../lib/datetime-formatter";

import styles from "./TripItem.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";
import countryNameConverter from "../../lib/country-name-converter";

export default function TripItem({ trip }) {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: removeTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });

  const removeTripHandler = (e) => {
    e.stopPropagation();
    mutate(trip.tripId);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        whileHover={{ scale: 1.25, zIndex: 5 }}
        animate={{
          rotate: Math.random() * 40 - 20,
          opacity: isPending ? 0.3 : 1,
        }}
        className={styles.wrapper}
        onClick={() => navigate(`/trips/${trip.tripId}`)}
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
          <img
            src={`/images/countries/${
              trip.countries[Math.floor(Math.random() * trip.countries.length)]
            }.webp`}
          />
        </div>

        <div className={styles.content}>
          {trip.cities.map((city, i) => (
            <p key={i} className={styles.cities}>
              ✈ {city.name}, {countryNameConverter(city.country)}
            </p>
          ))}
        </div>
        <ButtonRemove
          onClick={removeTripHandler}
          className={styles["remove-btn"]}
        />
      </m.div>
    </LazyMotion>
  );
}
