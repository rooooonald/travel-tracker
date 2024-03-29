import { FaTrainSubway, FaBus, FaCarRear, FaTaxi } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";

export function Bike({ size }) {
  return <MdDirectionsBike style={{ fontSize: size }} />;
}

function Bus({ size }) {
  return <FaBus style={{ fontSize: size }} />;
}

function Train({ size }) {
  return <FaTrainSubway style={{ fontSize: size }} />;
}

function Walk({ size }) {
  return <FaWalking style={{ fontSize: size }} />;
}

function Drive({ size }) {
  return <FaCarRear style={{ fontSize: size }} />;
}

function Taxi({ size }) {
  return <FaTaxi style={{ fontSize: size }} />;
}

const TransportIcon = {
  Bike,
  Bus,
  Train,
  Walk,
  Drive,
  Taxi,
};

export default TransportIcon;
