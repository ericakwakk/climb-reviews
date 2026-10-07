import ZineHeader from "@/components/b/ZineHeader";
import ZineFooter from "@/components/b/ZineFooter";
import "./zine.css";

// Version B: two-color climbing-club zine. Lives at /b while we compare designs.
export default function VersionBLayout({ children }) {
  return (
    <div className="zine">
      <ZineHeader />
      {children}
      <ZineFooter />
    </div>
  );
}
