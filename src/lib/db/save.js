import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./config";

import { v4 as uuidv4 } from "uuid";

export const addTripToDatebase = async (trip) => {
  const dateFromTimestamp = new Date(trip.dateFrom).getTime();
  const dateToTimestamp = new Date(trip.dateTo).getTime();

  let itinerary = [];
  let day = 1;

  for (
    let timestamp = dateFromTimestamp;
    timestamp <= dateToTimestamp;
    timestamp += 86400000
  ) {
    const dateObj = new Date(timestamp);

    const date = `${dateObj.getFullYear()}-${
      dateObj.getUTCMonth() + 1 > 9
        ? dateObj.getUTCMonth() + 1
        : `0${dateObj.getUTCMonth() + 1}`
    }-${
      dateObj.getUTCDate() > 9
        ? dateObj.getUTCDate()
        : `0${dateObj.getUTCDate()}`
    }`;

    const itineraryObj = {
      day: day++,
      date,
      visitPlaces: [],
    };
    itinerary.push(itineraryObj);
  }

  const data = {
    ...trip,
    itinerary,
  };

  const docRef = await addDoc(collection(db, "trips"), data);
  return docRef.id;
};

export const addItineraryItem = async (
  tripId,
  fullItinerary,
  currentDay,
  itineraryObj
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );
  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.visitPlaces.push({ placeId: uuidv4(), ...itineraryObj });

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};

export const addFlight = async (mode, tripId, flightObj) => {
  const tripRef = doc(db, "trips", tripId);

  if (mode === "depart") {
    await updateDoc(tripRef, {
      flightsDepart: arrayUnion(flightObj),
    });
  }

  if (mode === "return") {
    await updateDoc(tripRef, {
      flightsReturn: arrayUnion(flightObj),
    });
  }
};

export const addTransitMethod = async (
  tripId,
  placeId,
  fullItinerary,
  currentDay,
  transportObj
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );
  const updatedVisitPlace = updatedItinerary[
    currentDayItineraryIndex
  ].visitPlaces.find((place) => place.placeId === placeId);

  updatedVisitPlace.transportTo = updatedVisitPlace.transportTo
    ? [
        ...updatedVisitPlace.transportTo,
        { transitId: uuidv4(), ...transportObj },
      ]
    : [{ transitId: uuidv4(), ...transportObj }];

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};

export const addAccommodation = async (
  tripId,
  fullItinerary,
  currentDay,
  accommodationObj
) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currentDay
  );
  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.accommodation = {
    accommodationId: uuidv4(),
    ...accommodationObj,
  };

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};
