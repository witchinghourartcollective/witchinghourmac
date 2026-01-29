import Image from "next/image";

export default function PrimarySigilFooter() {
  return (
    <div className="primary-sigil-footer" aria-hidden="true">
      <Image
        src="/brand/sigil-primary.svg"
        alt=""
        width={140}
        height={140}
        priority={false}
        className="primary-sigil-mark"
      />
    </div>
  );
}
