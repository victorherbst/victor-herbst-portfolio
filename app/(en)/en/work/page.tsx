import WorkIndex from "@/components/WorkIndex";
import { pageMeta } from "@/lib/site";
export const metadata = pageMeta(
  "en",
  "Work — Victor Herbst",
  "Brands, websites and platforms. Seven cases with context, process and applications.",
  "/work",
);
export default function Page() {
  return <WorkIndex lang="en" />;
}
