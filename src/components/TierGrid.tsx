import type { TierConfig } from "@/lib/drop-config";
import { TierCard } from "@/components/TierCard";

type TierGridProps = {
  tiers: TierConfig[];
};

export function TierGrid({ tiers }: TierGridProps) {
  return (
    <div className="tier-grid">
      {tiers.map((tier) => (
        <TierCard key={tier.slug} tier={tier} />
      ))}
    </div>
  );
}
