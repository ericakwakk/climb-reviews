import SiteHeader from "@/components/a/SiteHeader";
import SiteFooter from "@/components/a/SiteFooter";

// Version A: playful plywood wall. The (a) folder is a "route group": it organizes files without adding to the URL.
export default function VersionALayout({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
