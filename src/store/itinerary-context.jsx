import { createContext, useState } from "react";

export const ItineraryContext = createContext({
  currDay: 1,
  trip: [],
  currItinerary: {},
  setDay: () => {},
  resetDay: () => {},
  setTrip: () => {},
});

export default function ItineraryContextProvider({ children }) {
  const [currDay, setCurrDay] = useState(1);
  const [trip, setTrip] = useState();

  const setTripHandler = (trip) => {
    setTrip(trip);
  };

  const setDayHandler = (change) => {
    if (change === -1 && currDay === 2) {
      setCurrDay(1);
      return;
    }

    if (change === 1 && currDay === trip?.itinerary.length - 1) {
      setCurrDay(trip?.itinerary.length);
      return;
    }

    setCurrDay((prev) => prev + change);
  };

  const resetDayHandler = () => {
    setCurrDay(1);
  };

  const currDayItinerary = trip?.itinerary.find(
    (itinerary) => itinerary.day === currDay
  );

  const context = {
    currDay,
    trip,
    currDayItinerary,
    setDay: setDayHandler,
    resetDay: resetDayHandler,
    setTrip: setTripHandler,
  };

  return (
    <ItineraryContext.Provider value={context}>
      {children}
    </ItineraryContext.Provider>
  );
}
