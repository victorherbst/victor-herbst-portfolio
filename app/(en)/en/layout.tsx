import Document, { baseMetadata } from "@/components/Document";
export const metadata = baseMetadata;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
