import styles from "./FormInput.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function FormInput({
  id,
  label,
  input,
  isFocused,
  errorMsg,
  className,
}) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={`${styles.wrapper} ${className}`}>
        <m.label
          initial={{ opacity: 0 }}
          animate={{
            opacity: isFocused || input.value ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          htmlFor={id}
        >
          {label}
        </m.label>
        <input
          id={id}
          {...input}
          style={{ borderColor: isFocused || input.value ? "#aaa" : "#ccc" }}
        />
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    </LazyMotion>
  );
}
