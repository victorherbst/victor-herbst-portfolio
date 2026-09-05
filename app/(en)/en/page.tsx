import Home from "@/components/Home";
import { pageMeta } from "@/lib/site";
export const metadata = {
  ...pageMeta(
    "en",
    "Victor Herbst — Independent design & development",
    "Brands, websites and platforms with personality. Explore Victor Herbst’s work and try the projects.",
  ),
  alternates: {
    canonical: "/en",
    languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
  },
};
export default function Page() {
  return <Home lang="en" />;
}
