import Loader from "react-js-loader";

import styles from "./PageLoader.module.scss";

export default function PageLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["loader-container"]}>
        <img src="/images/home/stamps.svg" />
        <Loader type="bubble-loop" />
      </div>
    </div>
  );
}
