import { HomeView } from "@/components/home/home-view";

/**
 * Home page (Server Component shell).
 * Delegates the bilingual, interactive UI to <HomeView /> (client) so the
 * language toggle updates copy instantly without a page reload.
 */
export default function HomePage() {
  return <HomeView />;
}
