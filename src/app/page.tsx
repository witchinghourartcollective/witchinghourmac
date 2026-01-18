import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center bg-transparent text-inherit">
      <h1 className="text-3xl tracking-[0.3em] uppercase text-[#c7c7cc]">
        Witching Hour
      </h1>

      <div className="max-w-2xl space-y-4 text-sm opacity-85 leading-relaxed">
        <p>
          Witching Hour Music is a living system.
          It is built from ritual, collaboration, and signal —
          not branding, not content, not noise.
        </p>
        <p>
          The sigils are not symbols.
          They are alignment tools.
        </p>
      </div>

      <Image
        src="/brand/sigil-primary.svg"
        alt="Primary Sigil"
        width={56}
        height={56}
        className="primary-sigil-soft"
      />
    </main>
  );
}
