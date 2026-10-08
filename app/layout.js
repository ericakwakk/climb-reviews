import { Anton, Bricolage_Grotesque, DM_Sans, Instrument_Sans, Permanent_Marker, Space_Mono } from "next/font/google";
import PrototypeBanner from "@/components/PrototypeBanner";
import "./globals.css";

// Fonts download at build time and are served from our own site.
// Each becomes a CSS variable. Version A uses Bricolage + DM Sans; version B uses Anton + Instrument Sans + Space Mono.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const instrumentSans = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });
// Sharpie-style handwriting for the grades written on start tape in the hero walls
const marker = Permanent_Marker({ variable: "--font-marker", subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Name TBD · Climbing gyms, rated and reviewed by climbers",
  description:
    "Discover climbing gyms through what actually matters: grading, setting style, community, value, and price, rated and reviewed by climbers.",
  // Prototype: keep it out of search results (see also app/robots.js)
  robots: { index: false, follow: false },
};

// The root layout wraps every page on the site. Each design version adds its own header/footer in its own layout.
export default function RootLayout({ children }) {
  const fonts = [bricolage, dmSans, anton, instrumentSans, spaceMono, marker].map((f) => f.variable).join(" ");

  return (
    <html lang="en" className={fonts}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PrototypeBanner />
        {children}
      </body>
    </html>
  );
}
