import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 pt-24">
      <div className="text-center">
        <p className="font-mono text-sm text-indigo-500">404</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink-900 dark:text-white">
          This page doesn't exist.
        </h1>
        <p className="mt-3 text-ink-500 dark:text-ink-300 max-w-md mx-auto">
          The page you're looking for may have been moved or removed. Let's get you back on track.
        </p>
        <Button asChild variant="indigo" size="lg" className="mt-8">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
