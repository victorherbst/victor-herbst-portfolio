import Lab from "@/components/Lab";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "pt",
  "Laboratório — Victor Herbst",
  "Experimentos em linguagem, aprendizagem e publicação.",
  "/laboratorio",
);
export default function Page() {
  return <Lab lang="pt" />;
}
