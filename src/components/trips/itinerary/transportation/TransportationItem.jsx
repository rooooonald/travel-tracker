import { useContext } from "react";
import { ItineraryContext } from "../../../../store/itinerary-context";
import { useMutation } from "@tanstack/react-query";

import { removeTransitMethod } from "../../../../lib/db/delete";

import BlankBox from "../../../ui/BlankBox";
import ButtonRemove from "../../../ui/buttons/ButtonRemove";
import currencyFormatter from "../../../../lib/currency-formatter";

import styles from "./TransportationItem.module.scss";
import { TransportIcon } from "../../../../styles/icons";
import { GiBottomRight3DArrow } from "react-icons/gi";

export default function TransportationItem({
  transportation,
  placeId,
  category,
  onAdd,
}) {
  const { trip, currDay } = useContext(ItineraryContext);

  const { mutate, isPending } = useMutation({
    mutationFn: removeTransitMethod,
  });

  if (!transportation) {
    return (
      <BlankBox onClick={onAdd} className={styles.blank}>
        <p>Add Transit Method</p>
      </BlankBox>
    );
  }

  const { transitId, method, from, to, departTime, arrivalTime, fare } =
    transportation;

  const removeTransitHandler = () => {
    mutate({
      tripId: trip.tripId,
      placeId,
      transitId,
      fullItinerary: trip.itinerary,
      currDay,
    });

    // await removeTransitMethod(
    //   trip.tripId,
    //   placeId,
    //   transitId,
    //   trip.itinerary,
    //   currDay
    // );
  };

  let icon;
  switch (method) {
    case "walk":
      icon = <TransportIcon.Walk />;
      break;
    case "drive":
      icon = <TransportIcon.Drive />;
      break;
    case "bus":
      icon = <TransportIcon.Bus />;
      break;
    case "train":
      icon = <TransportIcon.Train />;
      break;
    case "taxi":
      icon = <TransportIcon.Taxi />;
      break;
    case "bike":
      icon = <TransportIcon.Bike />;
      break;
  }

  return (
    <div
      className={`${styles.wrapper} ${
        isPending ? styles["is-pending"] : undefined
      }`}
    >
      <div className={`${styles.icon} ${styles[`bg-color-${category}`]}`}>
        {icon}
        {fare !== 0 && <p>{currencyFormatter(fare)}</p>}
      </div>

      <div className={styles.info}>
        <div>
          <p>{departTime}</p>
          <p className={styles.station}>{from}</p>
        </div>
        <div>
          <p>{arrivalTime}</p>
          <p className={styles.station}>{to}</p>
        </div>
        <GiBottomRight3DArrow className={styles.arrow} />
      </div>

      <ButtonRemove
        onClick={removeTransitHandler}
        className={styles["remove-btn"]}
      />
    </div>
  );
}
