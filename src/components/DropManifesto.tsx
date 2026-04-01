import { dropConfig, getPrimaryCollection } from "@/lib/drop-config";

export function DropManifesto() {
  const collection = getPrimaryCollection(dropConfig);

  return (
    <div className="drop-manifesto">
      <p className="drop-manifesto__overview">{collection.overview}</p>
      <div className="drop-manifesto__statements">
        {collection.manifesto.map((statement) => (
          <p key={statement}>{statement}</p>
        ))}
      </div>
    </div>
  );
}
