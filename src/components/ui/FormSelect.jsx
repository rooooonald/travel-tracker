import styles from "./FormSelect.module.scss";

export default function FormSelect({
  id,
  label,
  input,
  onChange,
  onFocus,
  onBlur,
  options,
  isFocused,
  className,
  errorMsg,
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <label
        htmlFor={id}
        style={{
          display: isFocused || input.value ? "block" : "none",
        }}
      >
        {label}
      </label>
      <select
        id={id}
        {...input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
