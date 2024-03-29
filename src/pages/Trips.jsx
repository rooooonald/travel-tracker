import { useEffect, useState } from "react";
import { getAllTrips } from "../lib/db/load";
import TripList from "../components/trips/TripList";
import PageLoader from "../components/ui/PageLoader";

export default function TripsPage() {
  const [tripList, setTripList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const tripList = await getAllTrips();

      const sortedList = tripList.sort((a, b) => {
        const aTimestamp = new Date(a.dateFrom).getTime();
        const bTimestamp = new Date(b.dateFrom).getTime();

        return bTimestamp - aTimestamp;
      });

      setTripList(sortedList);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <TripList trips={tripList} />;
}
