import styles from "./ButtonPrimary.module.scss";

export default function ButtonPrimary({
  type,
  onClick,
  disabled,
  className,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.wrapper} ${className}`}
    >
      {children}
    </button>
  );
}
