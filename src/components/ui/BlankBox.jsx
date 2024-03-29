import styles from "./BlankBox.module.scss";
import { MdAddCircleOutline } from "react-icons/md";

export default function BlankBox({ onClick, className, children }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <button onClick={onClick}>
        <div>
          <MdAddCircleOutline style={{ fontSize: "2rem" }} />
          {children}
        </div>
      </button>
    </div>
  );
}
