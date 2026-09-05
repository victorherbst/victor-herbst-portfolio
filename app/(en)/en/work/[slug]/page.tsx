import { notFound } from "next/navigation";
import CasePage from "@/components/CasePage";
import { findProject, projects, text } from "@/lib/projects";
import { pageMeta } from "@/lib/site";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = findProject((await params).slug);
  if (!p) return { title: "Projeto não encontrado" };
  return pageMeta(
    "en",
    p.name + " — Victor Herbst",
    text(p.intro, "en"),
    "/work/" + p.slug,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = findProject((await params).slug);
  if (!p) notFound();
  return <CasePage project={p} lang="en" />;
}
