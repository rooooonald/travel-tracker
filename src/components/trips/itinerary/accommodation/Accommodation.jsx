import { useContext, useState } from "react";
import { EditModeContext } from "../../../../store/edit-mode-context";

import AddressLink from "../../../ui/AddressLink";
import AddAccommodation from "./AddAccommodation";
import Modal from "../../../ui/Modal";
import BlankBox from "../../../ui/BlankBox";
import ButtonRemove from "../../../ui/buttons/ButtonRemove";
import currencyFormatter from "../../../../lib/currency-formatter";

import styles from "./Accommodation.module.scss";
import { AnimatePresence } from "framer-motion";
import { removeAccommodation } from "../../../../lib/db/delete";
import { ItineraryContext } from "../../../../store/itinerary-context";

export default function Accommodation({ accommodation }) {
  const [isAdding, setIsAdding] = useState(false);

  const { trip, currDay } = useContext(ItineraryContext);
  const { isEditMode } = useContext(EditModeContext);

  if (!accommodation) {
    return (
      <>
        <BlankBox className={styles.blank} onClick={() => setIsAdding(true)}>
          <p>TELL US WHERE YOU STAY</p>
        </BlankBox>
        <AnimatePresence>
          {isAdding && (
            <Modal title="ACCOMMODATION" onClose={() => setIsAdding(false)}>
              <AddAccommodation onClose={() => setIsAdding(false)} />
            </Modal>
          )}
        </AnimatePresence>
      </>
    );
  }

  const removeFlightHandler = async () => {
    await removeAccommodation(trip.tripId, trip.itinerary, currDay);
  };

  const { hotelName, address, pricePerNight, bookingRef } = accommodation;

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.title}>
          <p>{hotelName}</p>
          <p>
            <AddressLink address={address} />
          </p>
        </div>
        {bookingRef && (
          <div className={styles["booking-ref"]}>
            <p>Booking Reference: {bookingRef}</p>
          </div>
        )}
      </div>
      <div className={styles.price}>
        <p>{currencyFormatter(pricePerNight)}</p>
        <p>/ Night</p>
      </div>
      {isEditMode && (
        <ButtonRemove
          onClick={removeFlightHandler}
          className={styles["remove-btn"]}
        />
      )}
    </div>
  );
}
