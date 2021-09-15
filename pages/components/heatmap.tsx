import styles from "../../styles/Home.module.css";
import Squares from "./squares";
import Months from "./months";
import Days from "./days";

function HeatMap({ records }: { records: number[] }) {
  let counts: number[] = [];
  for (let i = 0; i < 365; i++) {
    counts.push(0);
  }
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  records.forEach((record) => {
    const diff = Math.floor((now.getTime() - record) / oneDay);
    if (diff < 365) {
      counts[diff]++;
    }
  });
  counts.reverse();
  return (
    <div className={styles.graph}>
      <Months
        months={[
          "",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ]}
        widths={[0, 4, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5]}
      />
      <Days />
      <Squares counts={counts} />
    </div>
  );
}

export default HeatMap;
