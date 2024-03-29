import { Link } from "react-router-dom";

import { FaMapLocationDot } from "react-icons/fa6";

export default function AddressLink({ address }) {
  const addressForUrl = (address) => {
    return address?.replace(/ /g, "+");
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${addressForUrl(
        address
      )}`}
      target="_blank"
    >
      {address} <FaMapLocationDot />
    </Link>
  );
}
