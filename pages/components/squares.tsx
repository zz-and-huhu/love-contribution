import styles from "../../styles/Home.module.css";

function Squares(props: { length: number }) {
  const { length } = props;
  return (
    <ul className={styles.squares}>
      {Array.from({ length }, (k, v) => v + 1).map((i) => (
        <li
          className={styles.square}
          data-level={Math.floor(Math.random() * 4)}
        ></li>
      ))}
    </ul>
  );
}

export default Squares;
