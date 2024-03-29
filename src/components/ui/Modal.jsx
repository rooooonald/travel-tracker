import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";

function ModalOverlay({ children, title, onClose }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: "-40%", x: "-50%" }}
        animate={{ opacity: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, y: "-40%", x: "-50%" }}
        className={styles.modal}
      >
        <div className={styles["modal-title"]}>
          <p>{title}</p>
        </div>
        <div className={styles.content}>{children}</div>
      </m.div>
    </LazyMotion>
  );
}

function Backdrop({ onClose }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.2 } }}
        className={styles.backdrop}
        onClick={onClose}
      ></m.div>
    </LazyMotion>
  );
}

export default function Modal({ children, title, onClose }) {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay title={title} onClose={onClose}>
        {children}
      </ModalOverlay>
    </>,
    document.getElementById("modal")
  );
}
