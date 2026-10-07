import HomeA from "@/components/a/HomeA";
import PageTransition from "@/components/PageTransition";
import { gyms } from "@/data/gyms";

// Server component: loads the gym data, then hands it to the interactive client component.
export default function Home() {
  return (
    <PageTransition>
      <HomeA gyms={gyms} />
    </PageTransition>
  );
}
