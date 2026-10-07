import LegalPage, { Contact, Section } from "./LegalPage";
import { SITE_NAME } from "@/lib/site";

// DRAFT terms in plain English. Not legal advice: have them reviewed before a public launch.
export default function TermsContent() {
  return (
    <LegalPage
      title="Terms of use"
      intro={`${SITE_NAME} helps climbers find gyms through ratings, tags and reviews from other climbers. By using the site, you agree to these terms.`}
    >
      <Section title="1. This is a prototype">
        <p>
          The site is still being built. Gym details (names, addresses, prices) are real, but the ratings and
          reviews you see right now are sample data, not real reviews.
        </p>
      </Section>

      <Section title="2. Who can use it">
        <p>You need to be at least 13 years old to create an account or post a review.</p>
      </Section>

      <Section title="3. Your account">
        <p>
          You sign in with a link sent to your email, so there&apos;s no password to remember. Keep your email
          account secure: anyone who can open your email can sign in as you.
        </p>
      </Section>

      <Section title="4. Reviews and what you post">
        <ul>
          <li>Review gyms you&apos;ve actually climbed at, based on your own experience.</li>
          <li>Don&apos;t review a gym you own, work for, or are paid by, or its competitors.</li>
          <li>No harassment, hate, threats, or personal details about other people (like staff names or photos of other climbers without their permission).</li>
          <li>We may remove reviews or accounts that break these rules.</li>
          <li>
            You keep ownership of what you write. By posting, you give us permission to show it on the site.
          </li>
        </ul>
      </Section>

      <Section title="5. Optional details about you">
        <p>
          When you write a review, you can choose to add your usual grades, height range, gender and age range.
          All of it is optional, and anything you add is shown publicly with that review.
        </p>
      </Section>

      <Section title="6. Photos">
        <p>
          Only upload photos you took yourself or have permission to share. By uploading, you give us permission
          to show them on the site. Photos are reviewed before they appear.
        </p>
      </Section>

      <Section title="7. Gym information">
        <p>
          We try to keep gym details accurate, but prices and other details change. Check the gym&apos;s own
          website before you go. Gyms can ask us to correct their information by contacting <Contact />.
        </p>
      </Section>

      <Section title="8. Google Maps">
        <p>
          Parts of this site use Google Maps. By using them, you also agree to the{" "}
          <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
            Google Maps/Google Earth Additional Terms of Service
          </a>{" "}
          and the{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          . Google ratings shown on the site come from Google and are never combined with our climbers&apos;
          ratings.
        </p>
      </Section>

      <Section title="9. OpenStreetMap">
        <p>
          Gym locations and some maps come from{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>
          , © OpenStreetMap contributors, available under the Open Database License.
        </p>
      </Section>

      <Section title="10. Climbing is risky">
        <p>
          Reviews are opinions from other climbers, not safety advice. Always follow your gym&apos;s rules and
          staff instructions. The site is provided as is, without guarantees.
        </p>
      </Section>

      <Section title="11. Changes and contact">
        <p>
          We may update these terms; the date at the top shows the latest version. Questions? Reach us at{" "}
          <Contact />.
        </p>
      </Section>
    </LegalPage>
  );
}
