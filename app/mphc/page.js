import { redirect } from "next/navigation";

// Short link: /mphc forwards to MPHC's gym page.
export default function MphcShortLink() {
  redirect("/gyms/mphc");
}
