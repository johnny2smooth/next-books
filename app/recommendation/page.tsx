export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 space-y-5">
        <h1 className="text-4xl">
          This should be a static component with a client child.
        </h1>
        <div className="text-left space-y-3">
          <p className="text-xl">
            Since this is the page.tsx file, it can be async.
          </p>
          <p className="text-xl">
            I want the page to be static, but the rec to be generated on the
            client-side.
          </p>
          <p>I can hydrate in links and redirects accordingly.</p>
        </div>
      </div>
    </>
  );
}
