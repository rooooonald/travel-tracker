import { Outlet } from "react-router-dom";

import Header from "../components/ui/Header";

import styles from "./RootLayout.module.scss";

export default function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.outlet}>
        <Outlet />
      </main>
    </div>
  );
}
