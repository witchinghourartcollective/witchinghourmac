import { SectionFrame } from "@/components/SectionFrame";
import { getArtifactAvailabilityLabel } from "@/lib/archive-media";
import { getMockCollectorProfile } from "@/lib/progression";

export default function ProfilePage() {
  const profile = getMockCollectorProfile();

  return (
    <main className="archive-page">
      <SectionFrame
        eyebrow="Collector profile"
        title={profile.statusLabel}
        subtitle={profile.statusSummary}
      >
        <div className="profile-grid">
          <article className="profile-card">
            <p className="profile-card__eyebrow">Status</p>
            <h2 className="profile-card__title">{profile.statusLabel}</h2>
            <p>
              {profile.creator
                ? `Progression is currently keyed to ${profile.creator.shortName} archive ownership.`
                : "Progression is currently keyed to mock archive ownership."}
            </p>
          </article>
          <article className="profile-card">
            <p className="profile-card__eyebrow">Collected</p>
            <h2 className="profile-card__title">{profile.totalCollected}</h2>
            <p>Visible ownership count across the current archive shell.</p>
          </article>
          <article className="profile-card">
            <p className="profile-card__eyebrow">hOUR balance</p>
            <h2 className="profile-card__title">{profile.hourBalance.toLocaleString()}</h2>
            <p>Mock balance for progression framing until wallet and token reads are live here.</p>
          </article>
        </div>
      </SectionFrame>
      <SectionFrame
        eyebrow="Owned artifacts"
        title="Carried from the archive"
        subtitle="This page tracks progression through what has been collected, not just what wallet is connected."
      >
        <div className="profile-grid">
          {profile.ownedArtifacts.map((artifact) => (
            <article key={artifact.id} className="profile-card">
              <p className="profile-card__eyebrow">{artifact.id}</p>
              <h2 className="profile-card__title">{artifact.title}</h2>
              <p>{artifact.description}</p>
              <p className="profile-card__meta">
                {artifact.tier} / {getArtifactAvailabilityLabel(artifact)} /{" "}
                {artifact.rewardAmount.toLocaleString()} hOUR
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>
    </main>
  );
}
