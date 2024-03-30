import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ItineraryContext } from "../store/itinerary-context";
import EditModeContextProvider, {
  EditModeContext,
} from "../store/edit-mode-context";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/db/config";

import ItineraryNav from "../components/trips/itinerary/ItineraryNav";
// import ItineraryByDay from "../components/trips/itinerary/ItineraryByDay";
import AddItineraryItem from "../components/trips/itinerary/itinerary-item/AddItineraryItem";
import Modal from "../components/ui/Modal";
import PageLoader from "../components/ui/PageLoader";

import styles from "./Itinerary.module.scss";
import { AnimatePresence } from "framer-motion";

export default function ItineraryPage() {
  const { tripId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { trip, setTrip, resetDay } = useContext(ItineraryContext);
  const { toggleEditMode } = useContext(EditModeContext);

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(doc(db, "trips", tripId), (doc) => {
      if (doc.data()) {
        const retrievedTrip = { tripId, ...doc.data() };

        setTrip(retrievedTrip);
        toggleEditMode();
        setIsLoading(false);
      }
    });

    resetDay();
  }, [tripId]);

  if (!trip || isLoading) {
    return <PageLoader />;
  }

  return (
    <EditModeContextProvider>
      <div className={styles.wrapper}>
        <ItineraryNav onAddItem={() => setIsAdding(true)} />

        <div className={styles.content}>
          <Outlet context={[isAdding, setIsAdding]} />
        </div>
        {/* <ItineraryByDay onAddItem={() => setIsAdding(true)} /> */}

        <AnimatePresence>
          {isAdding && (
            <Modal title="ITINERARY" onClose={() => setIsAdding(false)}>
              <AddItineraryItem onClose={() => setIsAdding(false)} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </EditModeContextProvider>
  );
}
