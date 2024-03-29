import styles from "./MapCountry.module.scss";

export default function MapCountry({
  id,
  title,
  d,
  isVisited,
  onChangeCountry,
}) {
  return (
    <>
      <path
        className={`${styles.path} ${isVisited ? styles.active : null}`}
        id={id}
        title={title}
        d={d}
        onMouseOver={() => onChangeCountry(id)}
      />
    </>
  );
}
