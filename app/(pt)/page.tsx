import Home from "@/components/Home";
import { pageMeta } from "@/lib/site";
export const metadata = {
  ...pageMeta(
    "pt",
    "Victor Herbst — Design & desenvolvimento independente",
    "Marcas, sites e plataformas com personalidade. Conheça o trabalho de Victor Herbst e experimente os projetos.",
  ),
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
  },
};
export default function Page() {
  return <Home lang="pt" />;
}
