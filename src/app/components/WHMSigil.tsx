type WHMSigilProps = {
  className?: string;
  size?: "sm" | "lg";
};

export default function WHMSigil({ className, size = "lg" }: WHMSigilProps) {
  const textClass =
    size === "sm" ? "whm-sigil-text whm-sigil-text-sm" : "whm-sigil-text";

  return (
    <div className={["whm-sigil", className].filter(Boolean).join(" ")}>
      <pre className={textClass}>
{String.raw`
   \  |  /\     /\  |  /
   \ | /  \   /  \ | /
____\|/    \ /    \|/____  
    /|\    / \    /|\
   / | \  /   \  / | \
  /  |  \/     \/  |  \
`}
      </pre>
      <div className="whm-sigil-glow" />
    </div>
  );
}
