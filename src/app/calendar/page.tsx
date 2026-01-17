export default function Calendar() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-sm tracking-[0.4em] uppercase opacity-80">
        Availability
      </h1>
      <p className="max-w-md text-sm opacity-75 leading-relaxed">
        <a
          href="https://calendar.app.google/B4CX5ZnMk6movn1B7"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-[#c7a24b] underline-offset-4 hover:opacity-90"
        >
          Book time with Fletcher Vaughn
        </a>
      </p>
    </main>
  );
}
