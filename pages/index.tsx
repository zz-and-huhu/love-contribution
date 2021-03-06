import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Client } from "@notionhq/client";
import HeatMap from "./components/heatmap";

export async function getStaticProps() {
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const { results } = await notion.databases.query({
    database_id: "3d54c96cc6ae48f59030df4de612e5c9",
  });
  const now = new Date();
  
  const oneDay = 1000 * 60 * 60 * 24;
  // const diff =
  //     now.getTime() -
  //     dt.getTime() +
  //     (now.getTimezoneOffset() - dt.getTimezoneOffset()) * 60 * 1000;
  const records = results
    .map((page) => new Date(page.created_time))
    .filter((tm) => now.getTime() - tm.getTime() < oneDay * 365)
    .map((tm) => tm.getTime()).sort();
  return { props: { records } };
}

export default function Home({ records }: { records: number[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Love Contribution💕</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Love Contribution by<br></br>
          <a href="https://github.com/ichn-hu/">@ichn-hu</a> and{" "}
          <a href="https://github.com/iynewz/">@iynewz</a>
        </h1>
      </main>
      <HeatMap records={records} />
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
