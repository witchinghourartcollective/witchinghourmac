import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-12 px-6 text-center bg-transparent text-inherit">

      
      {/* Sigil */}
      <div className="relative">
        <Image
          src="/brand/sigil-primary.svg"
          alt="Witching Hour Sigil"
          width={320}
          height={320}
          priority
          className="text-[#c7c7cc]"
        />

        {/* subtle accent glow (very restrained) */}
        <div className="absolute inset-0 blur-3xl opacity-20 bg-[#6f5f8d] -z-10" />
      </div>

      {/* Title */}
      <h1 className="text-lg tracking-[0.3em] uppercase text-[#c7c7cc]">
        Witching Hour
      </h1>

      {/* Tagline */}
      <p className="text-sm opacity-70 text-[#b6d7c9]">
        Make art with your friends.
      </p>

      {/* Accent rule */}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#5a1e2a] via-[#c7a24b] to-[#6f5f8d]" />
    </main>
  );
}
