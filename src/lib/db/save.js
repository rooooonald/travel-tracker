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
      expenses: [],
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

export const addItineraryItem = async ({
  tripId,
  fullItinerary,
  currDay,
  itineraryObj,
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );
  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.visitPlaces.push({ placeId: uuidv4(), ...itineraryObj });

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};

export const addFlight = async ({ mode, tripId, flightObj }) => {
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

export const addTransitMethod = async ({
  tripId,
  placeId,
  fullItinerary,
  currDay,
  transportObj,
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );
  const updatedVisitPlace = updatedItinerary[
    currentDayItineraryIndex
  ].visitPlaces.find((place) => place.placeId === placeId);

  let transitId = uuidv4();
  updatedVisitPlace.transportTo = updatedVisitPlace.transportTo
    ? [...updatedVisitPlace.transportTo, { transitId, ...transportObj }]
    : [{ transitId, ...transportObj }];

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });

  if (transportObj.fare > 0) {
    const expenseObj = {
      category: "transport",
      amount: transportObj.fare,
      description: `${transportObj.method.toUpperCase()}: ${
        transportObj.from
      } to ${transportObj.to}`,
    };

    await addExpense({
      tripId,
      fullItinerary,
      currDay,
      expenseObj,
      specificId: transitId,
    });
  }
};

export const addAccommodation = async ({
  tripId,
  fullItinerary,
  currDay,
  accommodationObj,
}) => {
  const updatedItinerary = [...fullItinerary];

  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );

  let accommodationId = uuidv4();
  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.accommodation = {
    accommodationId,
    ...accommodationObj,
  };

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });

  if (accommodationObj.pricePerNight > 0) {
    const expenseObj = {
      category: "accommodation",
      amount: accommodationObj.pricePerNight,
      description: accommodationObj.hotelName,
    };
    await addExpense({
      tripId,
      fullItinerary,
      currDay,
      expenseObj,
      specificId: accommodationId,
    });
  }
};

export const addExpense = async ({
  tripId,
  fullItinerary,
  currDay,
  expenseObj,
  specificId,
}) => {
  const updatedItinerary = [...fullItinerary];
  const currentDayItineraryIndex = updatedItinerary.findIndex(
    (itinerary) => itinerary.day === currDay
  );

  const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
  updatedDayItinerary.expenses.push({
    expenseId: specificId || uuidv4(),
    ...expenseObj,
  });

  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, { itinerary: updatedItinerary });
};
