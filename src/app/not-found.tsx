import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--canvas)] px-4 text-center text-[var(--text-primary)]">
      <div className="max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--surface)] p-8 shadow-xl">
        <p className="font-mono text-sm font-bold text-[var(--accent)]">404</p>
        <h1 className="mt-2 text-2xl font-bold">
          Route Not Found | الصفحة غير موجودة
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Return to ADDIS Logistics &amp; Supply Chain Solutions home corridor.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-contrast)]"
        >
          <span>Back to Home / الرئيسية</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </main>
  );
}

