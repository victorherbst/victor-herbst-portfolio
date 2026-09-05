import WorkIndex from "@/components/WorkIndex";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "pt",
  "Projetos — Victor Herbst",
  "Marcas, sites e plataformas. Sete cases com contexto, processo e aplicações.",
  "/projetos",
);
export default function Page() {
  return <WorkIndex lang="pt" />;
}
