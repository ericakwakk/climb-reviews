import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageTransition from "@/components/PageTransition";
import ReviewComposer from "@/components/ReviewComposer";
import SaveButtons from "@/components/SaveButtons";
import ReviewsB from "@/components/b/ReviewsB";
import Glyph from "@/components/Glyph";
import GymMap from "@/components/GymMap";
import LineHold from "@/components/b/LineHold";
import StarRating from "@/components/StarRating";
import ZineTag from "@/components/b/ZineTag";
import { gyms, getGymBySlug } from "@/data/gyms";
import {
  TAG_CATEGORIES,
  TYPE_LABELS,
  formatDate,
  formatMonthYear,
  formatPrice,
  googleMapsLink,
  tagsByCategory,
} from "@/lib/gymDisplay";
import { categoryOf } from "@/lib/tags";
import { storyFor } from "@/lib/closedGyms";
import styles from "./page.module.css";

export function generateStaticParams() {
  return gyms.map((gym) => ({ slug: gym.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gym = getGymBySlug(slug);
  return { title: gym ? `${gym.name} · Name TBD` : "Gym not found" };
}

export default async function GymPageB({ params }) {
  const { slug } = await params;
  const gym = getGymBySlug(slug);
  if (!gym) notFound();
  if (gym.status === "closed") return <ClosedGymPageB gym={gym} />;

  const hasReviews = gym.reviewCount > 0;
  const groupedTags = tagsByCategory(gym.tags);
  const mapsUrl = googleMapsLink(gym);

  return (
    <PageTransition>
    <main id="main" className={styles.page}>
      <Link href="/b" transitionTypes={["nav-back"]} className={`mono ${styles.back}`}>← All gyms</Link>

      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <p className={`mono ${styles.meta}`}>
          {gym.neighborhood}, {gym.city} · {TYPE_LABELS[gym.type]}
        </p>
        <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
          <h1 className={styles.name}>{gym.name}</h1>
        </ViewTransition>
        {hasReviews && (
          <p className={styles.headline}>
            <StarRating value={gym.ratings.overall} color="var(--zine-pink)" ink="var(--zine-ink)" size={24} />
            <span className="mono">from {gym.reviewCount} climbers</span>
          </p>
        )}

        <div className={styles.headerRow}>
          <p className={styles.address}>{gym.address}</p>
          {/* Save to a list (kept in this browser until sign-in exists) */}
          <SaveButtons slug={gym.slug} />
        </div>
      </header>

      <div className={styles.columns}>
        <div className={styles.main}>
          {hasReviews ? (
            <>
              {/* ---------- The scores ---------- */}
              <section>
                <div className={styles.sectionHead}>
                  <h2>The scores</h2>
                  <p className="mono">
                    From {gym.reviewCount} climbers · out of 5{gym.sample && " · SAMPLE DATA"}
                  </p>
                </div>
                <div className={styles.scores}>
                  {/* Overall first and biggest, then the three others, each in its own ink */}
                  <div className={styles.overallScore}>
                    <p className="mono">Overall</p>
                    <p className={styles.bigNumber}>{gym.ratings.overall.toFixed(1)}</p>
                  </div>
                  {[
                    ["Community", gym.ratings.community, "How welcoming it is", "var(--zine-yellow)"],
                    ["Setting", gym.ratings.setting, null, "var(--zine-green)"],
                    ["Value", gym.ratings.value, null, "var(--zine-orange)"],
                  ].map(([label, value, hint, color]) => (
                    <div key={label} className={styles.score} style={{ background: color }}>
                      <p className="mono">{label}</p>
                      <p className={styles.bigNumber}>{value.toFixed(1)}</p>
                      {hint && <p className={styles.scoreHint}>{hint}</p>}
                    </div>
                  ))}
                </div>
              </section>

              {/* ---------- Field notes: tags by category ---------- */}
              <section>
                <div className={styles.sectionHead}>
                  <h2>Field notes</h2>
                  <p className="mono">What climbers picked · number = how many chose it</p>
                </div>
                <dl className={styles.notes}>
                  {TAG_CATEGORIES.filter((c) => groupedTags[c.name]).map((c) => (
                    <div key={c.name} className={styles.note}>
                      <dt className="mono">
                        <Glyph category={c.name} size={20} />
                        {c.name}
                      </dt>
                      <dd>
                        {groupedTags[c.name].map((tag) => (
                          <ZineTag key={tag.label} label={tag.label} category={tag.category} count={tag.count} />
                        ))}
                      </dd>
                    </div>
                  ))}
                  {gym.amenities.length > 0 && (
                    <div className={styles.note}>
                      <dt className="mono">
                        <Glyph category="Amenities" size={20} />
                        Climbers mention
                      </dt>
                      <dd className={styles.amenities}>
                        {gym.amenities.map((a) => (
                          <span key={a.label}>
                            {a.label}
                            <sup>{a.count}</sup>
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>

              {/* ---------- Reviews as zine quotes ---------- */}
              <section>
                <div className={styles.sectionHead}>
                  <h2>Word on the wall</h2>
                  <p className="mono">{gym.reviews.length} reviews</p>
                </div>
                <ReviewsB reviews={gym.reviews} />
              </section>
            </>
          ) : (
            <section className={styles.empty}>
              <LineHold shape={3} color="var(--zine-blue)" size={120} rotate={-12} />
              <h2>No reviews yet.</h2>
              <p>Climbed here? Tell other climbers what it&apos;s like: the grades, the setting, the crowd.</p>
              <ReviewComposer gym={gym} base="/b" label="Write the first review →" className={styles.firstReview} />
            </section>
          )}
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className={styles.side}>
          {hasReviews && <ReviewComposer gym={gym} base="/b" label="Write a review →" />}

          {/* Prices: facts I enter, so they show when they were last checked */}
          <section className={styles.prices}>
            <div style={{ background: "var(--zine-yellow)" }}>
              <p className="mono">{gym.dayPass != null ? "Day pass" : "No public day pass"}</p>
              <p className={styles.priceAmount}>{gym.dayPass != null ? formatPrice(gym.dayPass) : "—"}</p>
            </div>
            <div style={{ background: "var(--zine-green)" }}>
              <p className="mono">{gym.membership != null ? "Membership / mo" : "Membership: see site"}</p>
              <p className={styles.priceAmount}>{gym.membership != null ? formatPrice(gym.membership) : "—"}</p>
            </div>
            <p className={`mono ${styles.priceNote}`}>
              As of {formatMonthYear(gym.pricesCheckedAt)} ·{" "}
              <a href={gym.website} target="_blank" rel="noopener noreferrer">Check current prices ↗</a>
            </p>
          </section>

          <GymMap gym={gym} />

          {/* Google rating: MOCK numbers until the Places API is connected */}
          <section className={styles.google}>
            <p className="mono">Second opinion: Google</p>
            {/* Empty until the Places API is connected: never show made-up Google numbers */}
            <p className={styles.googleScore}>
              — <span className="mono">Connects to Google soon</span>
            </p>
            <p className={styles.googleNote}>Everyone who&apos;s left a Google review, not just climbers.</p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mono">See reviews on Google Maps ↗</a>
            <p className={`mono ${styles.attribution}`}>Rating data © Google</p>
          </section>

          <section className={styles.info}>
            <p className="mono">Type</p>
            <p>{TYPE_LABELS[gym.type]}</p>
            <p className="mono">Address</p>
            <p>{gym.address}</p>
            <a href={gym.website} target="_blank" rel="noopener noreferrer" className="mono">Gym website ↗</a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mono">View on Google Maps ↗</a>
          </section>
        </aside>
      </div>
    </main>
    </PageTransition>
  );
}

// A closed gym's page in version B: same zine layout, but its story replaces scores, prices and reviews.
function ClosedGymPageB({ gym }) {
  const story = storyFor(gym);

  return (
    <PageTransition>
    <main id="main" className={styles.page}>
      <Link href="/b" transitionTypes={["nav-back"]} className={`mono ${styles.back}`}>← All gyms</Link>

      <header>
        <p className={`mono ${styles.meta}`}>
          {gym.neighborhood}, {gym.city} · <span className={styles.closedTag}>Closed · {story.years}</span>
        </p>
        <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
          <h1 className={styles.name}>{gym.name}</h1>
        </ViewTransition>
        <div className={styles.headerRow}>
          <p className={styles.address}>{gym.address}</p>
        </div>
      </header>

      <div className={styles.columns}>
        <div className={styles.main}>
          {/* The story, in my own words (lib/closedGyms.js). Nothing shows until it's written. */}
          {story.text.length > 0 && (
            <section>
              <div className={styles.sectionHead}>
                <h2>In memory</h2>
                <p className="mono">{story.closedOn}</p>
              </div>
              {story.text.map((paragraph, i) => (
                <p key={i} className={styles.storyIntro}>{paragraph}</p>
              ))}
            </section>
          )}
        </div>

        <aside className={styles.side}>
          <section className={styles.info}>
            <p className="mono">Climbing</p>
            <p>{story.climbing ?? TYPE_LABELS[gym.type]}</p>
            <p className="mono">Address</p>
            <p>{gym.address}</p>
            <p className="mono">Status</p>
            <p>{story.closedOn}</p>
          </section>
          <GymMap gym={gym} />
        </aside>
      </div>
    </main>
    </PageTransition>
  );
}
