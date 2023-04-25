import Link from "next/link";
import Image from "next/image";
import me from "../../public/meme.png";
export default function Page() {
  return (
    <>
      <div className="flex justify-center align-top items-start gap-4">
        <div className="flex flex-col items-center justify-center mt-10 space-y-5 ">
          <h1 className="text-4xl">
            Thank you very mucho for the recommendation!
          </h1>
          <div className="text-left space-y-3">
            <p className="text-xl">
              If you return to the homepage, you should be able to see your
              recommendation 😀
            </p>
          </div>
          <Link href="/">
            <button className="text-2xl border-purple-400 border-2 border-solid p-4 hover:text-purple-400">
              &larr;Go Back
            </button>
          </Link>
        </div>
        <Image
          src={me}
          placeholder="blur"
          alt="issa me"
          className="invert"
          width={300}
        />
      </div>
    </>
  );
}
