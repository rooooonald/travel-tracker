import { COUNTRIES } from "../../data/COUNTRIES";

export default function countryNameConverter(countryId) {
  return COUNTRIES.find((country) => country.id === countryId).title;
}
