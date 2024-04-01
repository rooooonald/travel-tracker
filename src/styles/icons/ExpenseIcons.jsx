import { FaRegListAlt } from "react-icons/fa";
import { MdLocalHotel } from "react-icons/md";
import ItineraryIcon from "./ItineraryIcons";
import TransportIcon from "./TransportIcons";

function Accommodation() {
  return <MdLocalHotel />;
}

function Miscellaneous() {
  return <FaRegListAlt />;
}

function Food() {
  return <ItineraryIcon.Dining />;
}

function Shopping() {
  return <ItineraryIcon.Shopping />;
}

function Activities() {
  return <ItineraryIcon.Sightseeing />;
}

function Transport() {
  return <TransportIcon.Train />;
}

const ExpenseIcon = {
  Accommodation,
  Miscellaneous,
  Food,
  Shopping,
  Activities,
  Transport,
};

export default ExpenseIcon;
