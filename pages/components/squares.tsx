import styles from "../../styles/Home.module.css";

function Squares({ counts }: { counts: number[] }) {
  return (
    <ul className={styles.squares}>
      {counts.map((count) => (
        <li className={styles.square} data-level={Math.min(count, 3)}></li>
      ))}
    </ul>
  );
}

export default Squares;
