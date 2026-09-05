import About from "@/components/About";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "pt",
  "Sobre Victor Herbst — Design & desenvolvimento",
  "Design, linguagem e desenvolvimento. Conheça a trajetória e o processo de trabalho de Victor Herbst.",
  "/sobre",
);
export default function Page() {
  return <About lang="pt" />;
}
