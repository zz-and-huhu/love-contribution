import styles from "../../styles/Home.module.css";

function Squares({
  counts,
}: {
  counts: { count: number; day: number; date: number }[];
}) {
  return (
    <ul className={styles.squares}>
      {counts.map((count) => (
        <li
          key={count.date}
          onMouseOver={() => {
            console.log(new Date(count.date));
          }}
          className={styles.square}
          data-level={Math.min(count.count, 3)}
        ></li>
      ))}
    </ul>
  );
}

export default Squares;
