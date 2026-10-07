import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageTransition from "@/components/PageTransition";
import GoogleRatingBadge from "@/components/GoogleRatingBadge";
import GymMap from "@/components/GymMap";
import RatingDisplay from "@/components/RatingDisplay";
import ReviewsA from "@/components/a/ReviewsA";
import ReviewComposer from "@/components/ReviewComposer";
import SaveButtons from "@/components/SaveButtons";
import Tag from "@/components/Tag";
import Carabiner from "@/components/illustrations/Carabiner";
import Hold from "@/components/illustrations/Hold";
import Glyph from "@/components/Glyph";
import StarRating from "@/components/StarRating";
import { gyms, getGymBySlug } from "@/data/gyms";
import {
  RATING_FIELDS,
  TAG_CATEGORIES,
  TYPE_LABELS,
  formatMonthYear,
  formatPrice,
  googleMapsLink,
  tagsByCategory,
} from "@/lib/gymDisplay";
import { storyFor } from "@/lib/closedGyms";
import styles from "./page.module.css";

// Tells Next.js every gym page that exists, so they're built ahead of time.
export function generateStaticParams() {
  return gyms.map((gym) => ({ slug: gym.slug }));
}

// Sets the browser tab title per gym.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gym = getGymBySlug(slug);
  return { title: gym ? `${gym.name} · Name TBD` : "Gym not found" };
}

// [slug] in the folder name means this one file handles every /gyms/<anything> URL.
export default async function GymPage({ params }) {
  const { slug } = await params;
  const gym = getGymBySlug(slug);
  if (!gym) notFound();
  if (gym.status === "closed") return <ClosedGymPage gym={gym} />;

  const hasReviews = gym.reviewCount > 0;
  const groupedTags = tagsByCategory(gym.tags);
  const mapsUrl = googleMapsLink(gym);

  return (
    <PageTransition>
    <main className={styles.page}>
      <Link href="/" transitionTypes={["nav-back"]} className={styles.back}>← All gyms</Link>

      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.type}>{TYPE_LABELS[gym.type]}</span>
          <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
            <h1 className={styles.name}>{gym.name}</h1>
          </ViewTransition>
          <p className={styles.address}>
            {gym.neighborhood} · {gym.address}
          </p>
          {hasReviews && (
            <p className={styles.headline}>
              <StarRating value={gym.ratings.overall} size={22} />
              <span>from {gym.reviewCount} climbers</span>
            </p>
          )}
        </div>

        {/* Save to a list (kept in this browser until sign-in exists) */}
        <SaveButtons slug={gym.slug} />
      </header>

      <div className={styles.columns}>
        {/* ---------- Main column: what climbers say ---------- */}
        <div className={styles.main}>
          {hasReviews ? (
            <>
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2>Ratings</h2>
                  <p>From {gym.reviewCount} climbers</p>
                  {gym.sample && <span className={styles.sample}>Sample data</span>}
                </div>
                <div className={styles.ratings}>
                  {/* Overall first, highlighted. Then community, setting, value. */}
                  <RatingDisplay label="Overall" value={gym.ratings.overall} highlight />
                  <div className={styles.otherRatings}>
                    {RATING_FIELDS.slice(1).map((field) => (
                      <RatingDisplay
                        key={field.key}
                        label={field.label}
                        hint={field.hint}
                        value={gym.ratings[field.key]}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2>What it&apos;s like</h2>
                  <p>What climbers picked. Numbers show how many chose each one.</p>
                </div>
                <dl className={styles.tagGroups}>
                  {TAG_CATEGORIES.filter((c) => groupedTags[c.name]).map((c) => (
                    <div key={c.name} className={styles.tagGroup}>
                      <dt>
                        <span className={styles.circuit} style={{ background: c.color }} aria-hidden="true">
                          <Glyph category={c.name} size={13} />
                        </span>
                        {c.name}
                      </dt>
                      <dd>
                        {groupedTags[c.name].map((tag) => (
                          <Tag key={tag.label} label={tag.label} category={tag.category} count={tag.count} />
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              {gym.amenities.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.sectionHead}>
                    <h2>Climbers mention</h2>
                    <p>Amenities flagged in reviews.</p>
                  </div>
                  <div className={styles.tagRow}>
                    {gym.amenities.map((amenity) => (
                      <Tag key={amenity.label} label={amenity.label} count={amenity.count} />
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2>Reviews</h2>
                  <p>{gym.reviews.length} reviews</p>
                </div>
                <ReviewsA reviews={gym.reviews} />
              </section>
            </>
          ) : (
            <section className={styles.empty}>
              <Hold shape={3} color="var(--color-hold-yellow)" size={96} rotate={-12} />
              <h2>No reviews yet</h2>
              <p>Climbed here? Tell other climbers what it&apos;s like: the grades, the setting, the crowd.</p>
              <ReviewComposer gym={gym} label="Write the first review" className={styles.firstReview} />
            </section>
          )}
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className={styles.side}>
          {hasReviews && <ReviewComposer gym={gym} />}

          {/* Prices: facts I enter, so they show when they were last checked */}
          <section className={styles.prices}>
            <div>
              <p className={styles.priceAmount}>{gym.dayPass != null ? formatPrice(gym.dayPass) : "—"}</p>
              <p className={styles.priceLabel}>{gym.dayPass != null ? "Day pass" : "No public day pass"}</p>
            </div>
            <div>
              <p className={styles.priceAmount}>{gym.membership != null ? formatPrice(gym.membership) : "—"}</p>
              <p className={styles.priceLabel}>{gym.membership != null ? "Membership / month" : "Membership: see gym site"}</p>
            </div>
            <p className={styles.priceNote}>
              As of {formatMonthYear(gym.pricesCheckedAt)}.{" "}
              <a href={gym.website} target="_blank" rel="noopener noreferrer">Check current prices ↗</a>
            </p>
          </section>

          <GymMap gym={gym} />

          {/* Empty until the Places API is connected: never show made-up Google numbers */}
          <GoogleRatingBadge mapsUrl={mapsUrl} />

          <section className={styles.info}>
            <Carabiner className={styles.infoClip} color="var(--color-hold-teal)" size={30} rotate={-24} />
            <dl>
              <div><dt>Type</dt><dd>{TYPE_LABELS[gym.type]}</dd></div>
              <div><dt>Address</dt><dd>{gym.address}</dd></div>
            </dl>
            <div className={styles.infoLinks}>
              <a href={gym.website} target="_blank" rel="noopener noreferrer">Gym website ↗</a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
            </div>
          </section>
        </aside>
      </div>
    </main>
    </PageTransition>
  );
}

// A closed gym's page: same layout and style as any gym page, but its story replaces
// the ratings, price, reviews and save buttons.
function ClosedGymPage({ gym }) {
  const story = storyFor(gym);

  return (
    <PageTransition>
    <main className={`${styles.page} ${styles.closedPage}`}>
      <Link href="/" transitionTypes={["nav-back"]} className={styles.back}>← All gyms</Link>

      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={`${styles.type} ${styles.closedBadge}`}>Closed · {story.years}</span>
          <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
            <h1 className={styles.name}>{gym.name}</h1>
          </ViewTransition>
          <p className={styles.address}>
            {gym.neighborhood} · {gym.address}
          </p>
        </div>
      </header>

      <div className={styles.columns}>
        <div className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>In memory</h2>
              <p>{story.closedOn}</p>
            </div>
            <p className={styles.storyIntro}>{story.intro}</p>
            <dl className={styles.storyNumbers}>
              {story.numbers.map((n) => (
                <div key={n.label}>
                  <dt>{n.label}</dt>
                  <dd>{n.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>Timeline</h2>
            </div>
            <ol className={styles.timeline}>
              {story.timeline.map((item) => (
                <li key={item.when}>
                  <p className={styles.when}>{item.when}</p>
                  <p>{item.what}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>Photos</h2>
              <p>Shared with permission</p>
            </div>
            <div className={styles.photoGrid}>
              {[1, 2, 3, 4].map((n) => (
                <figure key={n} className={styles.photoSlot}>
                  <span>Photo to come</span>
                </figure>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2>Memories</h2>
              <p>From the people who climbed here</p>
            </div>
            <div className={styles.memoryList}>
              {[1, 2].map((n) => (
                <blockquote key={n} className={styles.memorySlot}>
                  <p>A memory from a climber will go here.</p>
                  <footer>Name, years climbed here</footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className={styles.storySources}>
            <h2>Sources</h2>
            <ul>
              {story.sources.map((src) => (
                <li key={src.url}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className={styles.side}>
          <section className={styles.info}>
            <dl>
              <div><dt>Climbing</dt><dd>{story.climbing ?? TYPE_LABELS[gym.type]}</dd></div>
              <div><dt>Address</dt><dd>{gym.address}</dd></div>
              <div><dt>Status</dt><dd>{story.closedOn}</dd></div>
            </dl>
          </section>
          <GymMap gym={gym} />
        </aside>
      </div>
    </main>
    </PageTransition>
  );
}
