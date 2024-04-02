import { collection, doc, getDocs, query, getDoc } from "firebase/firestore";
import { db } from "./config";

export const getAllTrips = async () => {
  let tripList = [];

  const querySnapshot = await getDocs(collection(db, "trips"));
  querySnapshot.forEach((doc) => {
    tripList.push({ tripId: doc.id, ...doc.data() });
  });

  return tripList;
};

export const getTrip = async ({ signal, tripId }) => {
  const docRef = doc(db, "trips", tripId);
  const docSnap = await getDoc(docRef);
  // console.log({ tripId, ...docSnap.data() });
  return { tripId, ...docSnap.data() };

  // onSnapshot(doc(db, "trips", tripId), (doc) => {
  //   // console.log(doc.data());
  //   return { tripId, ...doc.data() };
  // });
};

export const getVisitedCountries = async () => {
  const q = query(collection(db, "trips"));
  const querySnapshot = await getDocs(q);
  const countries = [];
  querySnapshot.forEach((doc) => {
    for (let i = 0; i < doc.data().countries.length; i++) {
      if (countries.includes(doc.data().countries[i])) {
        continue;
      }
      countries.push(doc.data().countries[i]);
    }
  });

  return countries;
};
