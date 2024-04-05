import styles from "./ButtonRemove.module.scss";
import { GeneralIcon } from "../../../styles/icons";

export default function ButtonRemove({ className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles["remove-btn"]} ${className}`}
    >
      <GeneralIcon.Remove />
    </button>
  );
}
