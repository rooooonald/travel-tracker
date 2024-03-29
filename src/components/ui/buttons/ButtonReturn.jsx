import styles from "./ButtonReturn.module.scss";

export default function ButtonReturn({ type, onClick, className, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.wrapper} ${className}`}
    >
      {children}
    </button>
  );
}
