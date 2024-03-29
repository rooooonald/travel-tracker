import TripItem from "./TripItem";
import styles from "./TripList.module.scss";

export default function TripList({ trips }) {
  return (
    <div className={styles.wrapper}>
      {trips.map((trip) => (
        <TripItem key={trip.tripId} trip={trip} />
      ))}
    </div>
  );
}
