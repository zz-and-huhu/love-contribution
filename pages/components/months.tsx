import styles from "../../styles/Home.module.css";

function Months({ widths, months }: { widths: number[]; months: string[] }) {
  return (
    <ul
      className={styles.months}
      style={{
        gridTemplateColumns: `${widths
          .map((width) => `calc(var(--week-width) * ${width})`)
          .join(" ")}`,
      }}
    >
      {months.map((month, idx) => (
        <li key={idx}>{month}</li>
      ))}
    </ul>
  );
}

export default Months;
