import type { ReactNode } from "react";

type SectionFrameProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function SectionFrame({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionFrameProps) {
  return (
    <section className={`section-frame ${className ?? ""}`.trim()}>
      {(eyebrow || title || subtitle) && (
        <header className="section-frame__header">
          {eyebrow ? <p className="section-frame__eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="section-frame__title">{title}</h2> : null}
          {subtitle ? <p className="section-frame__subtitle">{subtitle}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}
