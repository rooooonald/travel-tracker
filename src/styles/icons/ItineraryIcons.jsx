import { FaBinoculars } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { MdLocalDining } from "react-icons/md";

function Shopping() {
  return <FaShoppingBag />;
}

function Dining() {
  return <MdLocalDining />;
}

function Sightseeing() {
  return <FaBinoculars />;
}

const ItineraryIcon = {
  Shopping,
  Dining,
  Sightseeing,
};

export default ItineraryIcon;
