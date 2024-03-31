import { useContext } from "react";
import { ItineraryContext } from "../../../store/itinerary-context";

import VisitPlaceItem from "./itinerary-item/VisitPlaceItem";
import Accommodation from "./accommodation/Accommodation";
import FlightList from "./flights/FlightList";

import styles from "./ItineraryByDay.module.scss";
import { WiSunrise } from "react-icons/wi";

export default function ItineraryByDay({ onAddItem }) {
  const { trip, currDay, currDayItinerary } = useContext(ItineraryContext);
  const { visitPlaces, accommodation } = currDayItinerary;
  const finalDay = trip.itinerary.length;

  const sortedPlaceList = visitPlaces.sort((a, b) => {
    let timeA = a.arrivalTime.split(":");
    let timeB = b.arrivalTime.split(":");

    if (+timeA[0] !== +timeB[0]) {
      return +timeA[0] - +timeB[0];
    } else {
      return +timeA[1] - +timeB[1];
    }
  });

  return (
    <div className={styles.wrapper}>
      {currDay === 1 && <FlightList mode="depart" />}

      {currDay !== 1 && (
        <div className={styles.start}>
          <WiSunrise />
        </div>
      )}

      {visitPlaces &&
        visitPlaces.length !== 0 &&
        sortedPlaceList.map((place) => (
          <VisitPlaceItem key={place.placeId} place={place} />
        ))}

      {visitPlaces && visitPlaces.length === 0 && <VisitPlaceItem />}

      {accommodation && <Accommodation accommodation={accommodation} />}
      {!accommodation && currDay !== finalDay && <Accommodation />}

      {currDay === finalDay && <FlightList mode="return" />}
    </div>
  );
}
