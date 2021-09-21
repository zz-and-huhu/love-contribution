import styles from "../../styles/Home.module.css";
import Squares from "./squares";
import Months from "./months";
import Days from "./days";

interface Day {
  count: number;
  date: number;
  day: number;
}

function HeatMap({ records }: { records: number[] }) {
  let counts: Day[] = [];
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  let firstDay = new Date(now.getTime() - 365 * oneDay);
  while (firstDay.getDay() != 0) {
    firstDay = new Date(firstDay.getTime() - oneDay);
  }
  let recordIdx = 0;
  while (
    recordIdx < records.length &&
    records[recordIdx] < firstDay.getTime()
  ) {
    recordIdx++;
  }
  let months: string[] = [];
  let addMonth = (m: number) => {
    months.push((m + 1).toString());
  };
  let widths = [];
  let curMonth = 0;
  let lastMonth = firstDay.getMonth();
  let week = 0;
  let firstWeekOfLastMonth = 1;
  for (let cur = firstDay, nxt; cur.getTime() < now.getTime(); cur = nxt) {
    nxt = new Date(cur.getTime() + oneDay);
    let count = 0;
    while (recordIdx < records.length && records[recordIdx] < nxt.getTime()) {
      count++;
      recordIdx++;
    }
    counts.push({ count, date: cur.getTime(), day: cur.getDay() });
    if (cur.getDay() == 0) {
      week++;
    }
    curMonth = cur.getMonth();
    if (curMonth != lastMonth) {
      addMonth(lastMonth);
      widths.push(week - firstWeekOfLastMonth);
      lastMonth = curMonth;
      firstWeekOfLastMonth = week;
    }
  }
  addMonth(curMonth);
  widths.push(week - firstWeekOfLastMonth);
  if (firstDay.getDate() != 0) {
    months[0] = "";
  }
  return (
    <div className={styles.graph}>
      <Months months={months} widths={widths} />
      <Days />
      <Squares counts={counts} />
    </div>
  );
}

export default HeatMap;
