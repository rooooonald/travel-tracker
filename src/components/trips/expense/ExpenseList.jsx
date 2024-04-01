import ExpenseIcon from "../../../styles/icons/ExpenseIcons";
import ExpenseItem from "./ExpenseItem";

import styles from "./ExpenseList.module.scss";

export default function ExpenseList({ category, list, totalAmount }) {
  let icon;
  switch (category) {
    case "food":
      icon = <ExpenseIcon.Food />;
      break;
    case "shopping":
      icon = <ExpenseIcon.Shopping />;
      break;
    case "activities":
      icon = <ExpenseIcon.Activities />;
      break;
    case "transport":
      icon = <ExpenseIcon.Transport />;
      break;
    case "accommodation":
      icon = <ExpenseIcon.Accommodation />;
      break;
    case "miscellaneous":
      icon = <ExpenseIcon.Miscellaneous />;
      break;
    default:
      icon = <ExpenseIcon.Miscellaneous />;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        <div>{icon}</div>
        <p>{category}</p>
      </div>

      {list.map((expense) => (
        <ExpenseItem key={expense.expenseId} expense={expense} />
      ))}
      <div className={styles.subtotal}>
        <p>Subtotal</p>
        <p> {totalAmount.toFixed(2)}</p>
      </div>
    </section>
  );
}
