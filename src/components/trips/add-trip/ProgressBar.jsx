import { FaPlane } from "react-icons/fa6";
import styles from "./ProgressBar.module.scss";

export default function ProgressBar({ step, totalSteps }) {
  return (
    <div className={styles.wrapper}>
      <p>
        STEP {step} OF {totalSteps}
      </p>
      <div className={styles["progress-bar-full"]}>
        <div
          className={styles["progress-bar"]}
          style={{ width: `${(100 / (totalSteps - 1)) * (step - 1)}%` }}
        />
        <FaPlane
          style={{ left: `${(100 / (totalSteps - 1)) * (step - 1)}%` }}
        />
      </div>
    </div>
  );
}
