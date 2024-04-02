import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { getUpdatedDayItinerary, updateItineraryInDatabase } from ".";

export const removeTrip = async (tripId) => {
  await deleteDoc(doc(db, "trips", tripId));
};

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
