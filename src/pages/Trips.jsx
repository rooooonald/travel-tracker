import { useQuery } from "@tanstack/react-query";

import { getAllTrips } from "../lib/db/load";

import TripList from "../components/trips/TripList";
import PageLoader from "../components/ui/PageLoader";

export default function TripsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
  });

  if (isPending) {
    return <PageLoader />;
  }

  return <TripList trips={data} />;
}
