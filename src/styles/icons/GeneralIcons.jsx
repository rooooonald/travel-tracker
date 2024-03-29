import { FaAngleLeft, FaAngleRight, FaMinus, FaPlus } from "react-icons/fa6";

export function Left({ size }) {
  return <FaAngleLeft style={{ fontSize: size }} />;
}

export function Right({ size }) {
  return <FaAngleRight style={{ fontSize: size }} />;
}

export function Add({ size }) {
  return <FaPlus style={{ fontSize: size }} />;
}

export function Remove({ size }) {
  return <FaMinus style={{ fontSize: size }} />;
}

const GeneralIcon = {
  Left,
  Right,
  Add,
  Remove,
};

export default GeneralIcon;
