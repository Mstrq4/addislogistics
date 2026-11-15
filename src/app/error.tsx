"use client";

import React from "react";
import { RefreshCcw } from "lucide-react";

export default function GlobalSegmentError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--canvas)] px-4 text-center text-[var(--text-primary)]">
      <div className="max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--surface)] p-8 shadow-xl">
        <h1 className="text-2xl font-bold">
          ADDIS Logistics — Temporary Interface Error
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          We encountered an unexpected display interruption. You can safely reload
          this view or contact our 24/7 desk at info@addislogistics-ye.com.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-contrast)]"
        >
          <RefreshCcw className="h-4 w-4" />
          <span>Reload View</span>
        </button>
      </div>
    </main>
  );
}

