import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ItineraryContext } from "../store/itinerary-context";
import { CurrencyContext } from "../store/currency-context";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/db/config";

import ItineraryNav from "../components/trips/itinerary/ItineraryNav";
import AddItineraryItem from "../components/trips/itinerary/itinerary-item/AddItineraryItem";
import AddExpense from "../components/trips/expense/AddExpense";
import Modal from "../components/ui/Modal";
import PageLoader from "../components/ui/PageLoader";

import styles from "./Itinerary.module.scss";
import { AnimatePresence } from "framer-motion";

export default function ItineraryPage() {
  const { tripId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const { trip, setTrip, resetDay } = useContext(ItineraryContext);
  const { resetCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(doc(db, "trips", tripId), (doc) => {
      if (doc.data()) {
        const retrievedTrip = { tripId, ...doc.data() };

        setTrip(retrievedTrip);
        setIsLoading(false);
      }
    });

    resetDay();
    resetCurrency();
  }, [tripId]);

  if (!trip || isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.wrapper}>
      <ItineraryNav
        onAddItem={() => setIsAddingItem(true)}
        onAddExpense={() => setIsAddingExpense(true)}
      />

      <div className={styles.content}>
        <Outlet
          context={{
            isAddingItem,
            setIsAddingItem,
            isAddingExpense,
            setIsAddingExpense,
          }}
        />
      </div>

      <AnimatePresence>
        {isAddingItem && (
          <Modal title="ITINERARY" onClose={() => setIsAddingItem(false)}>
            <AddItineraryItem onClose={() => setIsAddingItem(false)} />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isAddingExpense && (
          <Modal title="EXPENSE" onClose={() => setIsAddingExpense(false)}>
            <AddExpense onClose={() => setIsAddingExpense(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
