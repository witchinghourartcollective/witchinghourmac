import { dropConfig } from "@/lib/drop-config";

export function DropManifesto() {
  return (
    <div className="drop-manifesto">
      <p className="drop-manifesto__overview">{dropConfig.drop.overview}</p>
      <div className="drop-manifesto__statements">
        {dropConfig.drop.manifesto.map((statement) => (
          <p key={statement}>{statement}</p>
        ))}
      </div>
    </div>
  );
}
