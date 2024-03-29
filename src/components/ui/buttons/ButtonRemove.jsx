import styles from "./ButtonRemove.module.scss";
import { GeneralIcon } from "../../../styles/icons";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function ButtonRemove({ className, onClick }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        animate={{ rotate: [-10, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, type: "tween" }}
        type="button"
        onClick={onClick}
        className={`${styles["remove-btn"]} ${className}`}
      >
        <GeneralIcon.Remove />
      </m.button>
    </LazyMotion>
  );
}
