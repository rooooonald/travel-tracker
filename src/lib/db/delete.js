import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const removeItineraryItem = async (
  tripId,
  fullItinerary,
  currentDay,
  placeId
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );

  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.visitPlaces = updatedDayItinerary.visitPlaces.filter(
    (place) => place.placeId !== placeId
  );

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};

export const removeFlight = async (
  mode,
  tripId,
  fullFlightList,
  flightNumber
) => {
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

export const removeAccommodation = async (
  tripId,
  fullItinerary,
  currentDay
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );

  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.accommodation = null;

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};

export const removeTransitMethod = async (
  tripId,
  placeId,
  transitId,
  fullItinerary,
  currentDay
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );
  const updatedVisitPlace = updatedItinerary[
    currentDayItineraryIndex
  ].visitPlaces.find((place) => place.placeId === placeId);

  updatedVisitPlace.transportTo = updatedVisitPlace.transportTo.filter(
    (transit) => transit.transitId !== transitId
  );

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};
