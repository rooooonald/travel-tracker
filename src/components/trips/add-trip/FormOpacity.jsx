import styles from "./FormOpacity.module.scss";

import { LazyMotion, domAnimation, m } from "framer-motion";

export default function FormOpacity({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        className={styles.wrapper}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
