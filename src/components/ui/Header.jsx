import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { GeneralIcon } from "../../styles/icons";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="/trips"
          className={({ isActive }) => (isActive ? styles.active : null)}
          end
        >
          Trips
        </NavLink>

        <Link to="/trips/add" className={styles["add-btn"]}>
          <GeneralIcon.Add /> Create
        </Link>
      </nav>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,32L60,32C120,32,240,32,360,37.3C480,43,600,53,720,48C840,43,960,21,1080,53.3C1200,85,1320,171,1380,213.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
}
