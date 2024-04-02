import { useContext, useState } from "react";
import { ItineraryContext } from "../../../../store/itinerary-context";
import { useMutation } from "@tanstack/react-query";

import { removeAccommodation } from "../../../../lib/db/delete";

import AddressLink from "../../../ui/AddressLink";
import AddAccommodation from "./AddAccommodation";
import Modal from "../../../ui/Modal";
import BlankBox from "../../../ui/BlankBox";
import ButtonRemove from "../../../ui/buttons/ButtonRemove";

import styles from "./Accommodation.module.scss";
import { AnimatePresence } from "framer-motion";

export default function Accommodation({ accommodation }) {
  const [isAdding, setIsAdding] = useState(false);

  const { trip, currDay } = useContext(ItineraryContext);

  const { mutate, isPending } = useMutation({
    mutationFn: removeAccommodation,
  });

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

  const removeAccommodationHandler = () => {
    mutate({
      tripId: trip.tripId,
      fullItinerary: trip.itinerary,
      currDay,
      accommodationId: accommodation.accommodationId,
    });

    // await removeAccommodation(trip.tripId, trip.itinerary, currDay);
  };

  const { hotelName, address, pricePerNight, bookingRef } = accommodation;

  return (
    <div
      className={`${styles.wrapper} ${
        isPending ? styles["is-pending"] : undefined
      }`}
    >
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
        <p>{pricePerNight.toFixed(2)}</p>
        <p>/ Night</p>
      </div>

      <ButtonRemove
        onClick={removeAccommodationHandler}
        className={styles["remove-btn"]}
      />
    </div>
  );
}
