import { QueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const queryClient = new QueryClient();

/**
 * Retrieves a copy of the itinerary for the current day and the entire trip for updating in the database.
 * @param {array} fullItinerary - The full itinerary of the entire trip.
 * @param {number} currDay - The current day.
 * @returns {object} An object containing the updated copy of the itinerary for the entire trip and the itinerary for the current day.
 */
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

/**
 * Updates the itinerary of a trip in the database.
 * @param {string} tripId - The ID of the trip to update.
 * @param {array} itinerary - The updated itinerary to be saved.
 */
export const updateItineraryInDatabase = async (tripId, itinerary) => {
  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary });
};
