import About from "@/components/About";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "en",
  "About Victor Herbst — Design & development",
  "Design, language and development. Meet Victor Herbst and explore his approach to work.",
  "/about",
);
export default function Page() {
  return <About lang="en" />;
}
