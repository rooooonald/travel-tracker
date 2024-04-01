import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddTripPage from "./pages/AddTrip";
import ItineraryPage from "./pages/Itinerary";
import RootLayout from "./pages/RootLayout";
import TripsPage from "./pages/Trips";
import HomePage from "./pages/Home";
import ExpensePage from "./pages/Expense";
import ItineraryByDay from "./components/trips/itinerary/ItineraryByDay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/trips", element: <TripsPage /> },
      {
        path: "/trips/add",
        element: <AddTripPage />,
      },
      {
        path: "/trips/:tripId",
        element: <ItineraryPage />,
        children: [
          {
            index: true,
            element: <ItineraryByDay />,
          },
          {
            path: "/trips/:tripId/expense",
            element: <ExpensePage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <img src="/images/home/stamps2.svg" className="background-stamps" />
      <RouterProvider router={router} />
    </>
  );
}
