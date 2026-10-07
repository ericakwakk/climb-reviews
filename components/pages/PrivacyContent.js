import LegalPage, { Contact, Section } from "./LegalPage";
import { SITE_NAME } from "@/lib/site";

// DRAFT privacy policy in plain English, matching what the site actually does.
// Not legal advice: have it reviewed before a public launch. Update it whenever data handling changes.
export default function PrivacyContent() {
  return (
    <LegalPage
      title="Privacy"
      intro={`What ${SITE_NAME} collects, why, and what you can do about it. Short version: only what's needed to run the site, never sold, no ad tracking.`}
    >
      <Section title="1. What we collect">
        <ul>
          <li>
            <strong>Your email address</strong>, when you sign in. It&apos;s used to send your sign-in link and is
            never shown publicly.
          </li>
          <li>
            <strong>Your reviews:</strong> ratings, tags, amenities you flagged, what you wrote, and the date.
            These are public.
          </li>
          <li>
            <strong>Optional details about you</strong> (usual grades, height range, gender, age range), only if
            you choose to add them to a review. They&apos;re shown publicly with that review.
          </li>
          <li>
            <strong>Gym suggestions</strong> you send us.
          </li>
          <li>
            <strong>Saved gyms</strong> (Favorite, Want to visit, Visited). Right now these are stored only in your
            own browser; once accounts exist, they&apos;ll be stored with your account and only you can see them.
          </li>
        </ul>
      </Section>

      <Section title="2. What we don't do">
        <ul>
          <li>We don&apos;t sell your data or share it with advertisers.</li>
          <li>We don&apos;t use advertising or tracking cookies.</li>
          <li>We don&apos;t collect your location.</li>
        </ul>
      </Section>

      <Section title="3. Services that help run the site">
        <ul>
          <li>
            <strong>Supabase</strong> stores accounts, reviews and suggestions, and sends sign-in emails.
          </li>
          <li>
            <strong>Vercel</strong> hosts the site. Like any web host, it keeps basic request logs (such as IP
            addresses) for security and reliability.
          </li>
          <li>
            <strong>Google Maps</strong> draws the map view. When a Google map loads, Google receives standard
            browser information, as described in the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>OpenStreetMap</strong> draws the small maps on gym pages, and receives standard browser
            information when they load.
          </li>
        </ul>
      </Section>

      <Section title="4. Cookies and storage">
        <p>
          We use a cookie to keep you signed in, and your browser&apos;s storage to remember saved gyms. Google
          Maps may set its own cookies when the map view is open. No advertising cookies.
        </p>
      </Section>

      <Section title="5. Your choices">
        <ul>
          <li>Skip any optional question. Only the ratings are needed to post a review.</li>
          <li>
            Ask us to delete a review, your account, or all your data by contacting <Contact />.
          </li>
          <li>Clear saved gyms anytime by clearing this site&apos;s data in your browser.</li>
        </ul>
      </Section>

      <Section title="6. Children">
        <p>The site isn&apos;t meant for children under 13, and we don&apos;t knowingly collect their information.</p>
      </Section>

      <Section title="7. Changes and contact">
        <p>
          If we change how we handle data, we&apos;ll update this page and the date at the top. Questions? Reach us
          at <Contact />.
        </p>
      </Section>
    </LegalPage>
  );
}
