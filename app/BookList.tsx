import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
export default function BookList({ books }: { books: PageObjectResponse[] }) {
  return (
    <div className="drawn-box bg-black rounded-md grid p-6 gap-8 h-[85vh] overflow-scroll shadow-[inset_5px_-25px_40px_-25px] shadow-slate-200">
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
            <div className="drawn-box rounded p-4 stack max-w-xl px-4 bg-black text-slate-100   hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ease-in-out transform hover:scale-103 ">
              <h2 className="text-4xl">
                {emoji} {title}{" "}
                <span className="text-sm">
                  by{" "}
                  {Author.type === "rich_text" &&
                    Author.rich_text[0].plain_text}
                </span>
              </h2>
              <p className="px-4 py-2 bg-slate-800 text-slate-200 rounded-md">
                {Review.type === "rich_text" && Review.rich_text[0].plain_text}
              </p>
              <div className="flex justify-between">
                <p className="text-sm">
                  A {Genre.type === "select" && Genre.select.name} book reviewed
                  by{" "}
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
  );
}
