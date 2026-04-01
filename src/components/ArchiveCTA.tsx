import Link from "next/link";

type ArchiveCTAProps = {
  items: Array<{
    href: string;
    label: string;
  }>;
};

export function ArchiveCTA({ items }: ArchiveCTAProps) {
  return (
    <div className="archive-cta">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="archive-cta__link">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
