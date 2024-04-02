import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { getUpdatedDayItinerary, updateItineraryInDatabase } from ".";

/**
 * Removes a trip from the database.
 * @param {string} tripId - The ID of the trip to be removed.
 */
export const removeTrip = async (tripId) => {
  await deleteDoc(doc(db, "trips", tripId));
};

/**
 * Removes an itinerary item from the specified day of the trip.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip from which the itinerary item will be removed.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {string} params.placeId - The ID of the place to be removed from the itinerary.
 */
export const removeItineraryItem = async ({
  tripId,
  fullItinerary,
  currDay,
  placeId,
}) => {
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  const currentVisitPlaces = updatedDayItinerary.visitPlaces.find(
    (place) => place.placeId === placeId
  );

  updatedDayItinerary.visitPlaces = updatedDayItinerary.visitPlaces.filter(
    (place) => place.placeId !== placeId
  );

  // Clear Expense
  if (
    currentVisitPlaces.transportTo &&
    currentVisitPlaces.transportTo.length > 0
  ) {
    for (let transit of currentVisitPlaces.transportTo) {
      updatedDayItinerary.expenses = updatedDayItinerary.expenses.filter(
        (expense) => expense.expenseId !== transit.transitId
      );
    }
  }

  await updateItineraryInDatabase(tripId, updatedItinerary);
};

/**
 * Removes a flight from the specified mode (depart/return) of the trip.
 * @param {object} params - The parameters object.
 * @param {string} params.mode - The mode of the flight (depart/return).
 * @param {string} params.tripId - The ID of the trip from which the flight will be removed.
 * @param {array} params.fullFlightList - The full list of flights for the trip.
 * @param {string} params.flightNumber - The flight number of the flight to be removed.
 */
export const removeFlight = async ({
  mode,
  tripId,
  fullFlightList,
  flightNumber,
}) => {
  const tripRef = doc(db, "trips", tripId);

  const updatedFlightList = fullFlightList.filter(
    (flight) => flight.flightNumber !== flightNumber
  );

  if (mode === "depart") {
    await updateDoc(tripRef, {
      flightsDepart: updatedFlightList,
    });
  }

  if (mode === "return") {
    await updateDoc(tripRef, {
      flightsReturn: updatedFlightList,
    });
  }
};

/**
 * Removes accommodation from the specified day of the trip itinerary.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip from which the accommodation will be removed.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {string} params.accommodationId - The ID of the accommodation to be removed.
 */
export const removeAccommodation = async ({
  tripId,
  fullItinerary,
  currDay,
  accommodationId,
}) => {
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  updatedDayItinerary.accommodation = null;

  // Clear Expense
  updatedDayItinerary.expenses = updatedDayItinerary.expenses.filter(
    (expense) => expense.expenseId !== accommodationId
  );

  await updateItineraryInDatabase(tripId, updatedItinerary);
};

/**
 * Removes a transit method from the specified place in the trip itinerary.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip from which the transit method will be removed.
 * @param {string} params.placeId - The ID of the itinerary item from which the transit method will be removed.
 * @param {string} params.transitId - The ID of the transit method to be removed.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 */
export const removeTransitMethod = async ({
  tripId,
  placeId,
  transitId,
  fullItinerary,
  currDay,
}) => {
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  const updatedVisitPlace = updatedDayItinerary.visitPlaces.find(
    (place) => place.placeId === placeId
  );

  updatedVisitPlace.transportTo = updatedVisitPlace.transportTo.filter(
    (transit) => transit.transitId !== transitId
  );

  // Clear Expense
  updatedDayItinerary.expenses = updatedDayItinerary.expenses.filter(
    (expense) => expense.expenseId !== transitId
  );

  await updateItineraryInDatabase(tripId, updatedItinerary);
};

/**
 * Removes an expense from the specified day of the trip itinerary.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip from which the expense will be removed.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {string} params.expenseId - The ID of the expense to be removed.
 */
export const removeExpense = async ({
  tripId,
  fullItinerary,
  currDay,
  expenseId,
}) => {
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  updatedDayItinerary.expenses = updatedDayItinerary.expenses.filter(
    (expense) => expense.expenseId !== expenseId
  );

  await updateItineraryInDatabase(tripId, updatedItinerary);
};
