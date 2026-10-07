import SavedGyms from "@/components/pages/SavedGyms";
import { gyms } from "@/data/gyms";

export const metadata = { title: "Saved gyms · Name TBD" };

// Server component: hands the gym data to the client component, which reads your saved lists.
export default function SavedPage() {
  return <SavedGyms gyms={gyms} variant="a" />;
}
