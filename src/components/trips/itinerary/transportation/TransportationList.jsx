import { useState } from "react";

import TransportationItem from "./TransportationItem";
import AddTransport from "./AddTransport";
import Modal from "../../../ui/Modal";

import styles from "./TransportationList.module.scss";
import { MdAddCircleOutline } from "react-icons/md";
import { AnimatePresence } from "framer-motion";

export default function TransportationList({ transportTo, category, placeId }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className={styles.wrapper}>
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
        <button className={styles.add} onClick={() => setIsAdding(true)}>
          <MdAddCircleOutline style={{ fontSize: "2rem" }} />
        </button>
      )}

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
