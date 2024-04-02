import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./config";
import { getUpdatedDayItinerary, updateItineraryInDatabase } from ".";

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
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  updatedDayItinerary.visitPlaces.push({ placeId: uuidv4(), ...itineraryObj });

  await updateItineraryInDatabase(tripId, updatedItinerary);
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
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  const updatedVisitPlace = updatedDayItinerary.visitPlaces.find(
    (place) => place.placeId === placeId
  );

  let transitId = uuidv4();
  updatedVisitPlace.transportTo = updatedVisitPlace.transportTo
    ? [...updatedVisitPlace.transportTo, { transitId, ...transportObj }]
    : [{ transitId, ...transportObj }];

  // Create Expense
  if (transportObj.fare > 0) {
    const expenseObj = {
      category: "transport",
      amount: transportObj.fare,
      description: `${transportObj.method.toUpperCase()}: ${
        transportObj.from
      } to ${transportObj.to}`,
    };

    updatedDayItinerary.expenses.push({
      expenseId: transitId,
      ...expenseObj,
    });
  }

  await updateItineraryInDatabase(tripId, updatedItinerary);
};

export const addAccommodation = async ({
  tripId,
  fullItinerary,
  currDay,
  stayDays,
  accommodationObj,
}) => {
  const updatedItinerary = [...fullItinerary];

  for (let day = currDay; day < currDay + stayDays; day++) {
    const currentDayItineraryIndex = updatedItinerary.findIndex(
      (itinerary) => itinerary.day === day
    );
    const updatedDayItinerary = updatedItinerary[currentDayItineraryIndex];
    let accommodationId = uuidv4();

    if (updatedDayItinerary.accommodation) {
      // Clear Previous Accommodation Expenses
      updatedDayItinerary.expenses = updatedDayItinerary.expenses.filter(
        (expense) =>
          expense.expenseId !==
          updatedDayItinerary.accommodation.accommodationId
      );
    }

    updatedDayItinerary.accommodation = {
      accommodationId,
      ...accommodationObj,
    };

    if (accommodationObj.pricePerNight > 0) {
      const expenseObj = {
        category: "accommodation",
        amount: accommodationObj.pricePerNight,
        description: accommodationObj.hotelName,
      };
      updatedItinerary[currentDayItineraryIndex].expenses.push({
        expenseId: accommodationId,
        ...expenseObj,
      });
    }
  }

  // const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
  //   fullItinerary,
  //   currDay
  // );

  // let accommodationId = uuidv4();

  // updatedDayItinerary.accommodation = {
  //   accommodationId,
  //   ...accommodationObj,
  // };

  // Create Expense
  // if (accommodationObj.pricePerNight > 0) {
  //   const expenseObj = {
  //     category: "accommodation",
  //     amount: accommodationObj.pricePerNight,
  //     description: accommodationObj.hotelName,
  //   };
  //   updatedDayItinerary.expenses.push({
  //     expenseId: accommodationId,
  //     ...expenseObj,
  //   });
  // }

  await updateItineraryInDatabase(tripId, updatedItinerary);
};

export const addExpense = async ({
  tripId,
  fullItinerary,
  currDay,
  expenseObj,
}) => {
  const { updatedItinerary, updatedDayItinerary } = getUpdatedDayItinerary(
    fullItinerary,
    currDay
  );

  updatedDayItinerary.expenses.push({
    expenseId: uuidv4(),
    ...expenseObj,
  });

  await updateItineraryInDatabase(tripId, updatedItinerary);
};
