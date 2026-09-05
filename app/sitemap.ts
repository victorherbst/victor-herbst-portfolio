import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projetos",
    "/sobre",
    "/laboratorio",
    "/en",
    "/en/work",
    "/en/about",
    "/en/lab",
    ...projects.flatMap((p) => ["/projetos/" + p.slug, "/en/work/" + p.slug]),
  ].map((path) => ({
    url: "https://victorherbst.com.br" + path,
    lastModified: "2026-09-05",
    changeFrequency: "monthly",
    priority:
      path === ""
        ? 1
        : path.includes("/projetos/") || path.includes("/work/")
          ? 0.8
          : 0.7,
  }));
}
