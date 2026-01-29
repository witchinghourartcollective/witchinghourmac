import Image from "next/image";
import PersonalSigil from "../../components/PersonalSigil";

export default function Ritual0001() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center">
      <Image
        src="/brand/sigil-primary.svg"
        alt="Primary Sigil"
        width={320}
        height={320}
        priority
        className="sigil-animate"
      />

      <h1 className="text-sm tracking-[0.4em] uppercase opacity-80">
        Ritual 0001
      </h1>

      <PersonalSigil />

      <p className="max-w-xl text-sm opacity-75 leading-relaxed">
        I am love. I need nothing.
        I am already here.
      </p>
    </main>
  );
}
