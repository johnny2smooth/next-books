"use client";
import { useState } from "react";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import smilesmiley from "../public/smilesmiley.png";

export default function PostBookToNotion() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = {
      author: form.author.value,
      genre: form.genre.value,
      rating: form.rating.value,
      review: form.recommendation.value,
      book: form.book.value,
      reviewer: form.yourname.value,
      emoji: "🥹",
    };

    const response = await fetch("/api/notion-form", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    result.submitted && setHasSubmitted(true);
  };

  return (
    <div className="h-[75vh] max-w-sm border-2 border-slate-300 rounded-md p-2 stack w-2xl overflow-scroll shadow-[inset_5px_-25px_40px_-25px] shadow-slate-200 text-slate-200">
      {hasSubmitted ? (
        <FormSubmissionConfirmation />
      ) : (
        <FormContents handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

function FormSubmissionConfirmation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="flex flex-col justify-center items-center stack px-4"
    >
      <h2 className="text-4xl font-semibold text-center">✨Thank you✨</h2>
      <p className="text-center">your book review was succesfully submitted</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 3 }}
      >
        <Image
          src={smilesmiley}
          alt="smiley face"
          className="invert"
          width={100}
          height={100}
        />
      </motion.div>
      <p className="text-left">You should see your submission here shortly.</p>

      <p className="text-left">
        In the meantime, we would like to recommend two books to you based on
        what you recommended to us. Are you interested?
      </p>
      <motion.div className="w-full flex spacing-x-4 justify-around">
        <button className="w-[33%] border-2 border-red-500 text-slate-900 rounded-md py-2 bg-red-300 hover:bg-red-400 focus:bg-red-400 focus:font-semibold hover:font-semibold transition-color shadow-sm shadow-red-500 ease-in-out duration-600 active:shadow-[0_0_20px_5px] active:shadow-red-500 active:bg-red-300 active:border-slate-200 active:text-slate-900">
          no
        </button>
        <button className="w-[33%] border-2 border-green-500 text-slate-900 rounded-md py-2 bg-green-300 hover:bg-green-400 focus:bg-green-400 focus:font-semibold hover:font-semibold transition-color shadow-sm shadow-green-500 ease-in-out duration-600 active:shadow-[0_0_20px_5px] active:shadow-green-500 active:bg-green-300 active:border-slate-200 active:text-slate-900">
          yes
        </button>
      </motion.div>
    </motion.div>
  );
}

function FormContents({
  handleSubmit,
}: {
  handleSubmit: (event: FormEvent) => void;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      id="form"
      className="  p-6 stack w-2xl overflow-scroll text-slate-200"
    >
      <label htmlFor="book">What is the Book&apos;s title</label>
      <input type="text" id="book" name="book" required />
      <label htmlFor="author">Who is the Author?</label>
      <input type="text" id="author" name="author" required />
      <label htmlFor="genre">Genre</label>
      <select name="genre" id="genre">
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="romance">Romance</option>
        <option value="mystery">Mystery</option>
        <option value="horror">Horror</option>
        <option value="thriller">Thriller</option>
        <option value="science-fiction">Science Fiction</option>
        <option value="biography">Biography</option>
      </select>
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
      <div className="w-full flex flex-col">
        <label htmlFor="recommendation">Why did you like this book?</label>
        <textarea
          name="recommendation"
          id="recommendation"
          className="border-2 border-slate-300 rounded-md p-2"
          cols={30}
          rows={10}
          minLength={10}
        />
      </div>
      <label htmlFor="yourname">Your Name</label>
      <input
        type="text"
        id="yourname"
        name="yourname"
        autoComplete="name"
        required
      />

      <button
        type="submit"
        className="border-2 border-purple-500 text-slate-900 rounded-md py-2 bg-purple-300 hover:bg-purple-400 focus:bg-purple-400 focus:font-semibold hover:font-semibold transition-color shadow-sm shadow-slate-100 ease-in-out duration-600 active:shadow-[0_0_30px_5px] active:shadow-purple-200 active:bg-slate-50 active:border-slate-200 active:text-slate-900"
      >
        Submit
      </button>
    </form>
  );
}
