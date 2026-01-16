import PersonalSigil from "../components/PersonalSigil";
import WHMSigil from "../components/WHMSigil";

export default function Ritual() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center">
      <WHMSigil />

      <h1 className="text-sm tracking-[0.4em] uppercase opacity-80">
        Ritual 001
      </h1>

      <PersonalSigil />

      <p className="max-w-xl text-sm opacity-75 leading-relaxed">
        I am love. I need nothing.
        I am already here.
      </p>

      <PersonalSigil />
    </main>
  );
}

