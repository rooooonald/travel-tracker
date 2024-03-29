import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export const removeTrip = async (tripId) => {
  await deleteDoc(doc(db, "trips", tripId));
};

export const removeItineraryItem = async ({
  tripId,
  fullItinerary,
  currDay,
  placeId,
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );

  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.visitPlaces = updatedDayItinerary.visitPlaces.filter(
    (place) => place.placeId !== placeId
  );

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
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
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );

  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.accommodation = null;

  setTimeout(async () => {
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, { itinerary: updatedItinerary });
  }, 10000);
};

export const removeTransitMethod = async ({
  tripId,
  placeId,
  transitId,
  fullItinerary,
  currDay,
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
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
