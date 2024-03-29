import { useContext } from "react";
import { ItineraryContext } from "../../../../store/itinerary-context";
import { EditModeContext } from "../../../../store/edit-mode-context";
import { useMutation } from "@tanstack/react-query";

import { removeFlight } from "../../../../lib/db/delete";

import BlankBox from "../../../ui/BlankBox";
import ButtonRemove from "../../../ui/buttons/ButtonRemove";
import PageLoader from "../../../ui/PageLoader";
import dateTimeFormatter from "../../../../lib/datetime-formatter";

import styles from "./FlightItem.module.scss";

const dateTimeOptions = {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Toronto",
};

export default function FlightItem({ mode, flight, index, onAdd }) {
  const { trip } = useContext(ItineraryContext);
  const { isEditMode } = useContext(EditModeContext);
  const { mutate, isPending } = useMutation({ mutationFn: removeFlight });

  if (!flight) {
    return (
      <BlankBox className={styles.blank} onClick={onAdd}>
        <p>Add Flights</p>
      </BlankBox>
    );
  }
  const { airline, flightNumber, from, to } = flight;

  const removeFlightHandler = () => {
    mutate({
      mode,
      tripId: trip.tripId,
      fullFlightList:
        mode === "depart" ? trip.flightsDepart : trip.flightsReturn,
      flightNumber,
    });
    //   await removeFlight(
    //     mode,
    //     trip.tripId,
    //     mode === "depart" ? trip.flightsDepart : trip.flightsReturn,
    //     flightNumber
    //   );
  };

  return (
    <div
      className={`${styles.wrapper} ${
        isPending ? styles["is-pending"] : undefined
      }`}
    >
      <div className={styles.index}>
        <p>
          Flight {index} / {airline}
        </p>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <div>{flightNumber}</div>
          <p>
            {from.airport} - {to.airport}
          </p>
        </div>

        <p>
          {dateTimeFormatter(from.departTime, dateTimeOptions)} -{" "}
          {dateTimeFormatter(to.arrivalTime, dateTimeOptions)}
        </p>
      </div>
      {isEditMode && (
        <ButtonRemove
          onClick={removeFlightHandler}
          className={styles["remove-btn"]}
        />
      )}
    </div>
  );
}
