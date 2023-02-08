import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = {
      recommendation: form.recommendation.value as string,
      author: form.author.value as string,
      genre: form.genre.value as string,
      description: form.description.value as string,
      rating: form.rating.value as string,
      reviewer: form.reviewer.value as string,
    };

    const response = await fetch("/api/form", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };

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

// export default function Form() {
//   // Handle the submit event on form submit.
//   const handleSubmit = async (event: FormEvent) => {
//     // Stop the form from submitting and refreshing the page.
//     event.preventDefault();

//     // Cast the event target to an html form
//     const form = event.target as HTMLFormElement;

//     // Get data from the form.
//     const data = {
//       first: form.first.value as string,
//       last: form.last.value as string,
//     };

//     // Send the form data to our API and get a response.
//     const response = await fetch("/api/form", {
//       // Body of the request is the JSON data we created above.
//       body: JSON.stringify(data),
//       // Tell the server we're sending JSON.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // The method is POST because we are sending data.
//       method: "POST",
//     });

//     // Get the response data from server as JSON.
//     // If server returns the name submitted, that means the form works.
//     const result = await response.json();
//     alert(`Is this your full name: ${result.data}`);
//   };
//   return (
//     <div className="container">
//       <h1 className={"text-4xl"}>
//         Form <Link href="/">with</Link> JavaScript.
//       </h1>

//       <p>
//         Get started by looking at <code>pages/js-form.js</code>
//       </p>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="first">First Name</label>
//         <input type="text" id="first" name="first" required />
//         <label htmlFor="last">Last Name</label>
//         <input type="text" id="last" name="last" required />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//   event.preventDefault();
//   const formData = new FormData(event.currentTarget);
//   const data = Object.fromEntries(formData);
//   const { recommendation, author, genre, description, rating, reviewer } = data;

//   const response = await notion.pages.create({
//     icon: {
//       type: "emoji",
//       emoji: "🥬",
//     },
//     parent: {
//       type: "database_id",
//       database_id: process.env.NOTION_DATABASE_ID,
//     },
//     properties: {
//       Name: {
//         title: [
//           {
//             text: {
//               content: recommendation,
//             },
//           },
//         ],
//       },
//       Rating: {
//         rich_text: [
//           {
//             text: {
//               content: rating,
//             },
//           },
//         ],
//       },
//       Review: {
//         rich_text: [
//           {
//             text: {
//               content: description,
//             },
//           },
//         ],
//       },
//       Reviewer: {
//         rich_text: [
//           {
//             text: {
//               content: reviewer,
//             },
//           },
//         ],
//       },
//       Author: {
//         rich_text: [
//           {
//             text: {
//               content: author,
//             },
//           },
//         ],
//       },
//       Genre: {
//         select: {
//           name: genre,
//         },
//       },
//     },
//   });
//   console.log(response);
// }
