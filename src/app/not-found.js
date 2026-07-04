import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="heading-serif text-5xl sm:text-6xl">
        This Page Has
        <br />
        <span className="italic text-gold-dark">Evaporated.</span>
      </h1>
      <p className="mt-6 max-w-sm font-body text-sm text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link href="/" className="btn-primary mt-10">
        Return Home
      </Link>
    </div>
  );
}
