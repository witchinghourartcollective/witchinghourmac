import PersonalSigil from "../components/PersonalSigil";
import WHMSigil from "../components/WHMSigil";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center">
      <WHMSigil />

      <div className="max-w-2xl space-y-4 text-sm opacity-85 leading-relaxed">
        <p>
          Witching Hour Music is a living system.
        </p>
        <p>
          It is built from ritual, collaboration, and signal —
          not branding, not content, not noise.
        </p>
        <p>
          The sigils are not symbols.
          They are alignment tools.
        </p>
      </div>

      <PersonalSigil />
    </main>
  );
}
