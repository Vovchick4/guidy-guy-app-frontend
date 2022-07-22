import styles from "./FormRow.module.css";

export default function FormRow({ children }) {
  return <div className={styles.content}>{children}</div>;
}
