import { useContext, useState } from "react";

import { ItineraryContext } from "../../../../store/itinerary-context";

import Modal from "../../../ui/Modal";
import AddFlight from "./AddFlight";
import FlightItem from "./FlightItem";

import styles from "./FlightList.module.scss";
import { FaPlus } from "react-icons/fa6";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { AnimatePresence } from "framer-motion";

export default function FlightList({ mode }) {
  const [isAdding, setIsAdding] = useState(false);

  const { trip } = useContext(ItineraryContext);
  const flights = mode === "depart" ? trip.flightsDepart : trip.flightsReturn;

  const sortedFlightList = flights?.sort((a, b) => {
    const aTimestamp = new Date(a.from.departTime).getTime();
    const bTimestamp = new Date(b.from.departTime).getTime();

    return aTimestamp - bTimestamp;
  });

  let icon = mode === "depart" ? <MdFlightLand /> : <MdFlightTakeoff />;

  return (
    <div className={styles.wrapper}>
      <div className={styles["flight-icon-container"]}>{icon}</div>
      <div className={styles.list}>
        {flights &&
          sortedFlightList.map((flight, i) => (
            <FlightItem
              key={flight.flightNumber}
              mode={mode}
              flight={flight}
              index={i + 1}
            />
          ))}
        {(!flights || flights.length === 0) && (
          <FlightItem onAdd={() => setIsAdding(true)} />
        )}
      </div>

      {flights && flights.length > 0 && (
        <button className={styles.add} onClick={() => setIsAdding(true)}>
          <FaPlus />
        </button>
      )}

      <AnimatePresence>
        {isAdding && (
          <Modal
            onClose={() => setIsAdding(false)}
            title={mode === "depart" ? "DEPARTING FLIGHT" : "RETURN FLIGHT"}
          >
            <AddFlight mode={mode} onClose={() => setIsAdding(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
