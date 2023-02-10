import styles from "./page.module.css";
import { Client } from "@notionhq/client";
// import NotionForm from "./JSNotionForm";
import StaticNotionForm from "./StaticNotionForm";
import Image from "next/image";
import me from "../public/meme.png";
import berserk from "../public/berserk2x.png";
import tennis from "../public/tennis2x.png";
import moka from "../public/moka2x.png";
import BookList from "./BookList";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getBooks() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
  });
  return response.results as QueryDatabaseResponse["results"];
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className={`${styles.main} flex-wrap space-x-4 space-y-4 pr-4`}>
      <Image
        src={me}
        placeholder="blur"
        alt="issa me"
        className="invert"
        width={300}
      />
      <BookList books={books} />
      {/* <NotionForm /> */}
      <StaticNotionForm />
      <div className="flex flex-col justify-center items-center space-x-2 space-y-2">
        <Image
          src={berserk}
          width={150}
          alt="berserk, my favorite graphic novel of all time."
          className="invert"
        />
        <Image
          src={tennis}
          alt="tennis is my favorite sport"
          width={100}
          height={100}
          className="invert"
        />
        <Image
          src={moka}
          alt="moka is my favorite coffee maker"
          width={100}
          height={100}
          className="invert"
        />
      </div>
    </main>
  );
}
