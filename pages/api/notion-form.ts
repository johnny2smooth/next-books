import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
let databaseId = process.env.NOTION_DATABASE_ID || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { author, genre, rating, review, book, reviewer, emoji } = req.body;

    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      icon: {
        type: "emoji",
        emoji: "📚",
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: book,
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
          rich_text: [
            {
              text: {
                content: genre,
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
                content: review,
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
      },
    });
    res.status(200).json({ data: `${book}`, submitted: true });
  } else {
    res.status(405).json({ error: "Method not allowed", submitted: false });
  }
}
