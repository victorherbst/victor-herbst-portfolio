import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found shell">
      <p className="eyebrow">404</p>
      <h1>This path does not exist yet.</h1>
      <Link className="button primary" href="/en">
        Back to home →
      </Link>
    </main>
  );
}
