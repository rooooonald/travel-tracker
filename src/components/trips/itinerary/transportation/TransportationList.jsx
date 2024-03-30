import { useRef, useState } from "react";
import useHorizontalScroll from "../../../../hooks/use-horizontal-scroll";

import TransportationItem from "./TransportationItem";
import AddTransport from "./AddTransport";
import Modal from "../../../ui/Modal";

import styles from "./TransportationList.module.scss";
import { MdAddCircleOutline } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { GeneralIcon } from "../../../../styles/icons";

export default function TransportationList({ transportTo, category, placeId }) {
  const [isAdding, setIsAdding] = useState(false);
  const listRef = useRef();

  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll(listRef, 200);

  return (
    <div className={styles.wrapper} ref={listRef}>
      <button
        className={styles["scroll-left-btn"]}
        onClick={scrollLeft}
        style={{ visibility: canScrollLeft ? "visible" : "hidden" }}
      >
        <GeneralIcon.Left />
      </button>
      {transportTo &&
        transportTo.map((transportation, i) => (
          <TransportationItem
            key={i}
            placeId={placeId}
            transportation={transportation}
            category={category}
          />
        ))}
      {(!transportTo || transportTo.length === 0) && (
        <TransportationItem onAdd={() => setIsAdding(true)} />
      )}
      {transportTo && transportTo.length > 0 && (
        <button className={styles["add-btn"]} onClick={() => setIsAdding(true)}>
          <MdAddCircleOutline style={{ fontSize: "2rem" }} />
        </button>
      )}

      <button
        className={styles["scroll-right-btn"]}
        onClick={scrollRight}
        style={{ visibility: canScrollRight ? "visible" : "hidden" }}
      >
        <GeneralIcon.Right />
      </button>

      <AnimatePresence>
        {isAdding && (
          <Modal onClose={() => setIsAdding(false)} title="TRANSPORTATION">
            <AddTransport
              placeId={placeId}
              onClose={() => setIsAdding(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
