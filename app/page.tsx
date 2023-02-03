import styles from "./page.module.css";
const { Client } = require("@notionhq/client");
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getBooks() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // return response.results as QueryDatabaseResponse["results"];
  return response.results as QueryDatabaseResponse["results"];
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className={`${styles.main} `}>
      <div className="border-2 border-slate-200 rounded-md grid p-6 gap-4">
        {books.map((book) => {
          const { id, properties, icon } = book as PageObjectResponse;
          let { Rating, Review, Author, Genre, Reviewer, Name } = properties;

          let emoji = icon?.type === "emoji" ? icon.emoji : "📖";

          return (
            <div key={id} className="border-2 border-slate-300 rounded">
              <h1>
                {emoji} {Name.type === "title" && Name.title[0].plain_text} by{" "}
                {Author.type === "rich_text" && Author.rich_text[0].plain_text}
              </h1>
              <p>
                A {Genre.type === "select" && Genre.select.name} book reviewed
                by{" "}
                {Reviewer.type === "rich_text" &&
                  Reviewer.rich_text[0].plain_text}
              </p>
              <p>
                {Review.type === "rich_text" && Review.rich_text[0].plain_text}
              </p>
              <p>
                {Rating.type === "rich_text" && Rating.rich_text[0].plain_text}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
