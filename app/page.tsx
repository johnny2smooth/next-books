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
      <div className="border-2 bg-slate-50 border-slate-300 rounded-md grid p-6 gap-8 max-h-[75vh] overflow-scroll shadow-[inset_5px_-25px_40px_-25px] shadow-slate-200">
        {books.map((book) => {
          const { id, properties, icon } = book as PageObjectResponse;
          let { Rating, Review, Author, Genre, Reviewer, Name } = properties;

          let emoji = icon?.type === "emoji" ? icon.emoji : "📖";

          let title = Name.type === "title" ? Name.title[0].plain_text : "";
          let author =
            Author.type === "rich_text" ? Author.rich_text[0].plain_text : "";

          return (
            <a
              key={id}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/search?q=${(title + " " + author)
                .split(" ")
                .join("+")}&oq=${title.split(" ").join("+")}`}
            >
              <div className="border-2 border-slate-100 rounded p-4 stack max-w-xl px-4 bg-slate-50 text-slate-900 shadow-sm shadow-slate-400 hover:shadow-[20px_25px_30px_-15px_rgba(0,0,0,.5)]  hover:border-slate-200 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ease-in-out transform hover:scale-103 ">
                <h2 className="text-4xl">
                  {emoji} {title}{" "}
                  <span className="text-sm">
                    by{" "}
                    {Author.type === "rich_text" &&
                      Author.rich_text[0].plain_text}
                  </span>
                </h2>
                <p className="px-4 py-2 bg-slate-100 text-slate-900 rounded-md">
                  {Review.type === "rich_text" &&
                    Review.rich_text[0].plain_text}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm">
                    A {Genre.type === "select" && Genre.select.name} book
                    reviewed by{" "}
                    {Reviewer.type === "rich_text" &&
                      Reviewer.rich_text[0].plain_text}
                  </p>
                  <p>
                    {Rating.type === "rich_text" &&
                      Rating.rich_text[0].plain_text}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
