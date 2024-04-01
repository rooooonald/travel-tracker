import styles from "./PlaceTime.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";
import ItineraryIcon from "../../../../styles/icons/ItineraryIcons";

export default function PlaceTime({ category, arrivalTime, stayTime }) {
  let icon;
  switch (category) {
    case "shopping":
      icon = <ItineraryIcon.Shopping />;
      break;
    case "dining":
      icon = <ItineraryIcon.Dining />;
      break;
    case "sightseeing":
      icon = <ItineraryIcon.Sightseeing />;
      break;
    default:
      icon = <ItineraryIcon.Sightseeing />;
  }
  return (
    <LazyMotion features={domAnimation}>
      <div className={`${styles.wrapper} ${styles[`text-color-${category}`]}`}>
        <div
          className={`${styles["time-bar"]} ${styles[`bg-color-${category}`]}`}
        />
        <div
          className={`${styles["time-dot"]} ${styles[`bg-color-${category}`]}`}
        >
          {icon}
        </div>

        {arrivalTime && (
          <m.div
            key={`${arrivalTime}-${stayTime}`}
            initial={{ rotate: 0 }}
            animate={{ rotate: -15 }}
            className={`${styles["time-info"]} ${
              styles[`border-color-${category}`]
            }`}
          >
            <p className={styles["arrival-time"]}>{arrivalTime}</p>
            <p
              className={`${styles["stay-time"]} ${
                styles[`bg-color-${category}`]
              }`}
            >
              {stayTime >= 60
                ? `${Math.floor(stayTime / 60)} hr${
                    Math.floor(stayTime / 60) === 1 ? "" : "s"
                  }`
                : ""}{" "}
              {stayTime % 60 !== 0 ? `${stayTime % 60} mins` : ""}
            </p>
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}
