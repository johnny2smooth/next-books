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

  return response.results as QueryDatabaseResponse["results"];
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className={styles.main}>
      <h1>Books</h1>
      {books.map((book) => {
        const { id, properties } = book as PageObjectResponse;
        const { Rating, Review, Author, Created, Genre, Reviewer, Name } =
          properties;

        // I should be handling the types elsewhere, but this is just a quick example

        return (
          <div key={id}>
            <h1>
              {Name.type === "title" && Name.title[0].plain_text} by{" "}
              {Author.type === "rich_text" && Author.rich_text[0].plain_text}
            </h1>
            <p>
              A {Genre.type === "select" && Genre.select.name} book reviewed by{" "}
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
    </main>
  );
}
