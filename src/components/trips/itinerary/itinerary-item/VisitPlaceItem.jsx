import { useContext } from "react";
import { ItineraryContext } from "../../../../store/itinerary-context";
import { EditModeContext } from "../../../../store/edit-mode-context";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

import { removeItineraryItem } from "../../../../lib/db/delete";

import TransportationList from "../transportation/TransportationList";
import PlaceTime from "./PlaceTime";
import BlankBox from "../../../ui/BlankBox";
import AddressLink from "../../../ui/AddressLink";
import ButtonRemove from "../../../ui/buttons/ButtonRemove";

import styles from "./VisitPlaceItem.module.scss";

export default function VisitPlaceItem({ place }) {
  const { trip, currDay } = useContext(ItineraryContext);
  const { isEditMode } = useContext(EditModeContext);
  const [isAdding, setIsAdding] = useOutletContext();

  const { mutate, isPending } = useMutation({
    mutationFn: removeItineraryItem,
  });

  if (!place) {
    return (
      <div className={styles.wrapper}>
        <PlaceTime category="sightseeing" />
        <BlankBox className={styles.blank} onClick={setIsAdding}>
          <p>FILL UP YOUR ITINERARY</p>
        </BlankBox>
      </div>
    );
  }

  const {
    placeId,
    name,
    address,
    category,
    arrivalTime,
    stayTime,
    transportTo,
  } = place;

  const sortedTransportList = transportTo?.sort((a, b) => {
    let timeA = a.departTime.split(":");
    let timeB = b.departTime.split(":");

    if (+timeA[0] !== +timeB[0]) {
      return +timeA[0] - +timeB[0];
    } else {
      return +timeA[1] - +timeB[1];
    }
  });

  const removeHandler = () => {
    mutate({
      tripId: trip.tripId,
      fullItinerary: trip.itinerary,
      currDay,
      placeId,
    });
    // await removeItineraryItem(trip.tripId, trip.itinerary, currDay, placeId);
  };

  return (
    <div
      className={`${styles.wrapper} ${
        isPending ? styles["is-pending"] : undefined
      }`}
    >
      <PlaceTime
        category={category}
        arrivalTime={arrivalTime}
        stayTime={stayTime}
      />
      <div className={styles.content}>
        <div className={styles["place-info"]}>
          <h2>{name}</h2>
          <p>
            <AddressLink address={address} />
          </p>
        </div>
        <TransportationList
          transportTo={sortedTransportList}
          category={category}
          placeId={placeId}
        />
      </div>
      {isEditMode && (
        <ButtonRemove
          onClick={removeHandler}
          className={styles["remove-btn"]}
        />
      )}
    </div>
  );
}
