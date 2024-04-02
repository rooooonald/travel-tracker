import { QueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const queryClient = new QueryClient();

export const getUpdatedDayItinerary = (fullItinerary, currDay) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );
  return {
    updatedItinerary,
    updatedDayItinerary: updatedItinerary[currentDayItineraryIndex],
  };
};

export const updateItineraryInDatabase = async (tripId, itinerary) => {
  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary });
};
