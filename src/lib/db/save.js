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

/**
 * Adds a new trip to the database.
 * @param {object} trip - The trip object containing trip details.
 * @returns {string} The ID of the newly added trip.
 */
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

/**
 * Adds an itinerary item to the specified day of a specified trip.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip to which the itinerary item will be added.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {object} params.itineraryObj - The itinerary object to be added.
 */
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

/**
 * Adds a flight to the specified trip based on the mode (depart/return).
 * @param {object} params - The parameters object.
 * @param {string} params.mode - The mode of the flight (depart/return).
 * @param {string} params.tripId - The ID of the trip to which the flight will be added.
 * @param {object} params.flightObj - The flight object to be added.
 */
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

/**
 * Adds a transit method for a specific place in the itinerary.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip to which the transit method will be added.
 * @param {string} params.placeId - The ID of the itinerary item for which the transit method is being added.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {object} params.transportObj - The transport object representing the transit method.
 */
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

/**
 * Adds accommodation for a specified number of days to a specified day in the itinerary.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip to which the accommodation will be added.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {number} params.stayDays - The number of days the accommodation will be booked for.
 * @param {object} params.accommodationObj - The accommodation object to be added.
 */
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

/**
 * Adds an expense to the itinerary for a specific day.
 * @param {object} params - The parameters object.
 * @param {string} params.tripId - The ID of the trip to which the expense will be added.
 * @param {array} params.fullItinerary - The full itinerary array.
 * @param {number} params.currDay - The current day of the itinerary.
 * @param {object} params.expenseObj - The expense object to be added.
 */
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
