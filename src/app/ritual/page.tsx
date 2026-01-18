import Link from "next/link";

export default function RitualLanding() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-sm tracking-[0.4em] uppercase opacity-80">
        Rituals
      </h1>

      <Link
        href="/ritual/0001"
        className="text-sm uppercase tracking-[0.35em] underline decoration-[#c7a24b] underline-offset-4 hover:opacity-90"
      >
        Ritual 0001
      </Link>
      <Link
        href="/ritual/0002"
        className="text-sm uppercase tracking-[0.35em] underline decoration-[#c7a24b] underline-offset-4 hover:opacity-90"
      >
        Ritual 0002
      </Link>
    </main>
  );
}
