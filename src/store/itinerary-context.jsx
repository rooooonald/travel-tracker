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
    setCurrDay((prev) => prev + change);
  };

  const resetDayHandler = () => {
    setCurrDay(1);
  };

  const currDayItinerary = trip?.itinerary.find(
    (itinerary) => itinerary.day === currDay
  );

  const finalDay = trip?.itinerary.length;

  const context = {
    trip,
    currDay,
    finalDay,
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
