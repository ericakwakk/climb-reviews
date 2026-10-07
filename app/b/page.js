import HomeB from "@/components/b/HomeB";
import PageTransition from "@/components/PageTransition";
import { gyms } from "@/data/gyms";

// Server component: loads the gym data, then hands it to the interactive client component.
export default function HomeBPage() {
  return (
    <PageTransition>
      <HomeB gyms={gyms} />
    </PageTransition>
  );
}
