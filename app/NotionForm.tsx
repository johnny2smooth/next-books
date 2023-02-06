"use client";
export {};
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);
  const { recommendation, author, genre, description, rating, reviewer } = data;

  const response = await notion.pages.create({
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    parent: {
      type: "database_id",
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: recommendation,
            },
          },
        ],
      },
      Rating: {
        rich_text: [
          {
            text: {
              content: rating,
            },
          },
        ],
      },
      Review: {
        rich_text: [
          {
            text: {
              content: description,
            },
          },
        ],
      },
      Reviewer: {
        rich_text: [
          {
            text: {
              content: reviewer,
            },
          },
        ],
      },
      Author: {
        rich_text: [
          {
            text: {
              content: author,
            },
          },
        ],
      },
      Genre: {
        select: {
          name: genre,
        },
      },
    },
  });
  console.log(response);
}

export default function Form() {
  return (
    <form
      onSubmit={handleSubmit}
      className="h-[75vh] border-2 border-slate-300 rounded-md p-6 stack w-2xl overflow-scroll shadow-[inset_5px_-25px_40px_-25px] shadow-slate-200 text-slate-200"
    >
      <label htmlFor="recommendation">
        What book do you want to recommend?
      </label>
      <input type="text" id="recommendation" name="recommendation" />
      <label htmlFor="author">Author</label>
      <input type="text" id="author" name="author" />
      <label htmlFor="genre">Genre</label>
      <select id="genre" name="genre">
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="biography">Biography</option>
        <option value="poetry">Poetry</option>
        <option value="drama">Drama</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="description">Tell why you liked the book:</label>

      <textarea
        id="description"
        name="description"
        placeholder="It was a dark and stormy night..."
        rows={5}
        cols={33}
        minLength={50}
        maxLength={250}
        required
      ></textarea>

      <fieldset>
        <legend>Rating</legend>

        <div className="flex flex-col justify-around">
          <div>
            <input type="radio" id="1" name="rating" value="⭐️☆☆☆☆" />
            <label htmlFor="1" className="ml-2">
              ⭐️☆☆☆☆
            </label>
          </div>
          <div>
            <input type="radio" id="2" name="rating" value="⭐️⭐️☆☆☆" />
            <label htmlFor="2" className="ml-2">
              ⭐️⭐️☆☆☆
            </label>
          </div>
          <div>
            <input type="radio" id="3" name="rating" value="⭐️⭐️⭐️☆☆" />
            <label htmlFor="3" className="ml-2">
              ⭐️⭐️⭐️☆☆
            </label>
          </div>
          <div>
            <input type="radio" id="4" name="rating" value="⭐️⭐️⭐️⭐️☆" />
            <label htmlFor="4" className="ml-2">
              ⭐️⭐️⭐️⭐️☆
            </label>
          </div>
          <div>
            <input type="radio" id="5" name="rating" value="⭐️⭐️⭐️⭐️⭐️" />
            <label htmlFor="5" className="ml-2">
              ⭐️⭐️⭐️⭐️⭐️
            </label>
          </div>
        </div>
      </fieldset>

      <label htmlFor="reviewer">Your Name</label>
      <input type="text" id="reviewer" name="reviewer" />
      <button type="submit">Submit</button>
    </form>
  );
}
