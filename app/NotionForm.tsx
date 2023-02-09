"use client";
import { useState } from "react";
import { FormEvent } from "react";

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
    console.log(result);
    result.submitted && setHasSubmitted(true);
  };
  console.log(hasSubmitted);

  return (
    <div className="h-[75vh] border-2 border-slate-300 rounded-md p-2 stack w-2xl overflow-scroll shadow-[inset_5px_-25px_40px_-25px] shadow-slate-200 text-slate-200">
      {hasSubmitted ? (
        <FormSubmissionConfirmation />
      ) : (
        <FormContents handleSubmit={handleSubmit} />
      )}
    </div>
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

function FormSubmissionConfirmation() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">
        Thank you for your submission!
      </h1>
      <p className="text-center">
        You should see your submission here shortly.
      </p>
    </>
  );
}
