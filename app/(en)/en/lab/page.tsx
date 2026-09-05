import Lab from "@/components/Lab";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "en",
  "Lab — Victor Herbst",
  "Experiments in language, learning and publishing.",
  "/lab",
);
export default function Page() {
  return <Lab lang="en" />;
}
