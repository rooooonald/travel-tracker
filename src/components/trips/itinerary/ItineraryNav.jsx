import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ItineraryContext } from "../../../store/itinerary-context";

import ButtonPrimary from "../../ui/buttons/ButtonPrimary";
import dateTimeFormatter from "../../../lib/datetime-formatter";
import countryNameConverter from "../../../lib/country-name-converter";

import styles from "./ItineraryNav.module.scss";
import { GeneralIcon } from "../../../styles/icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { MdAddChart, MdOutlineAddLocation } from "react-icons/md";
import { HiSwitchHorizontal } from "react-icons/hi";

export default function ItineraryNav({ onAddItem, onAddExpense }) {
  const { pathname } = useLocation();
  const isExpensePage = pathname.endsWith("/expense");

  const navigate = useNavigate();

  const { trip, currDay, currDayItinerary, setDay } =
    useContext(ItineraryContext);

  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        initial={{ x: 10, rotate: 5 }}
        animate={{ x: 10, rotate: -5 }}
        className={styles.wrapper}
      >
        <div
          className={styles.img}
          style={{
            backgroundImage: `url("/images/countries/${trip.countries[0]}.webp")`,
          }}
        >
          <h1>{trip.title}</h1>

          {trip.cities.map((city, i) => (
            <p key={i} className={styles.cities}>
              ✈ {city.name}, {countryNameConverter(city.country)}
            </p>
          ))}

          <p className={styles["trip-date"]}>
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
          </p>
        </div>

        <div className={styles["day-select"]}>
          <button disabled={currDay === 1} onClick={() => setDay(-1)}>
            <GeneralIcon.Left size="2rem" />
          </button>

          <div className={styles["current-day"]}>
            <m.div
              key={currDayItinerary?.day}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.25 }}
            >
              <p>EPISODE</p>
              <p>{currDayItinerary?.day}</p>
            </m.div>
            <p>
              {dateTimeFormatter(currDayItinerary?.date, {
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
          </div>
          <button
            disabled={currDay === trip.itinerary.length}
            onClick={() => setDay(1)}
          >
            <GeneralIcon.Right size="2rem" />
          </button>
        </div>

        {!isExpensePage && (
          <div className={styles["btn-group"]}>
            <ButtonPrimary
              onClick={() => navigate(`/trips/${trip.tripId}/expense`)}
              className={styles["switch-button"]}
            >
              <HiSwitchHorizontal />
              <p>TO EXPENSE</p>
            </ButtonPrimary>
            <button onClick={onAddItem}>
              <MdOutlineAddLocation />
            </button>
          </div>
        )}
        {isExpensePage && (
          <div className={styles["btn-group"]}>
            <ButtonPrimary
              onClick={() => navigate(`/trips/${trip.tripId}`)}
              className={styles["switch-button"]}
            >
              <HiSwitchHorizontal />
              <p>TO ITINERARY</p>
            </ButtonPrimary>

            <button onClick={onAddExpense}>
              <MdAddChart />
            </button>
          </div>
        )}
      </m.aside>
    </LazyMotion>
  );
}
