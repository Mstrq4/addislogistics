"use client";

import React, { Component, ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Anchor,
  Compass,
  Globe2,
  Plane,
  RotateCcw,
  Ship,
  Truck,
} from "lucide-react";
import { FLEET_STAGES } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

const DynamicLogisticsScene = dynamic(() => import("./LogisticsScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

const STAGE_ICONS = [Globe2, Plane, Ship, Anchor, Truck];

function SceneSkeleton() {
  return (
    <div
      aria-busy="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[var(--canvas)]"
    >
      <div className="maritime-grid absolute inset-0 opacity-35" />
      <div className="aurora-sheen absolute inset-0 opacity-50" />
    </div>
  );
}

class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function LogisticsStageWrapper({
  scrollProgress,
  activeStage,
}: {
  scrollProgress: number;
  activeStage: number | null;
}) {
  const { theme, dir } = useLocale();
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const fallback = (
    <div
      className="relative h-full w-full overflow-hidden bg-[var(--canvas)]"
      style={{ backgroundImage: "var(--hero-glow)" }}
    >
      <div className="maritime-grid absolute inset-0 opacity-35" />
    </div>
  );

  return (
    <SceneErrorBoundary fallback={fallback}>
      <DynamicLogisticsScene
        scrollProgress={scrollProgress}
        activeStage={activeStage}
        isDark={theme === "dark"}
        isRtl={dir === "rtl"}
        reducedMotion={reducedMotion}
      />
    </SceneErrorBoundary>
  );
}

export function GlobalScroll3DCanvas() {
  const { locale, lockedStage, setLockedStage } = useLocale();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const computeScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(ratio);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeScroll);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const autoStage =
    scrollProgress < 0.16
      ? 0
      : scrollProgress < 0.36
      ? 1
      : scrollProgress < 0.6
      ? 2
      : scrollProgress < 0.78
      ? 3
      : 4;

  const currentStageIndex = lockedStage !== null ? lockedStage : autoStage;
  const currentStage = FLEET_STAGES[currentStageIndex] ?? FLEET_STAGES[0];
  const progressPct = Math.round(scrollProgress * 100);

  return (
    <>
      {/* Fixed Full-Viewport 3D World Traveling Behind Entire Site */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      >
        <LogisticsStageWrapper
          scrollProgress={scrollProgress}
          activeStage={lockedStage}
        />
        {/* Subtle readability vignette at edges while preserving vivid center 3D depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 60% 45%, transparent 25%, color-mix(in srgb, var(--canvas) 55%, transparent) 100%)",
          }}
        />
      </div>

      {/* Floating Scroll-Synced 3D Fleet HUD Controller (bottom inline-start) */}
      <aside
        aria-label={
          locale === "ar"
            ? "لوحة التحكم في المشهد ثلاثي الأبعاد"
            : "3D Fleet Camera Controller"
        }
        className="fixed bottom-4 start-4 z-40 hidden max-w-md flex-col gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-3 shadow-2xl backdrop-blur-xl md:flex"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
            <Compass className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {currentStage.title[locale]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span dir="ltr" className="font-mono text-[11px] font-bold text-[var(--accent)]">
              {progressPct}%
            </span>
            {lockedStage !== null ? (
              <button
                type="button"
                onClick={() => setLockedStage(null)}
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{locale === "ar" ? "تلقائي" : "Auto"}</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Interactive Stage Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1">
          {FLEET_STAGES.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx] ?? Globe2;
            const active = currentStageIndex === idx;
            const shortLabel =
              idx === 0
                ? locale === "ar"
                  ? "الشامل"
                  : "All"
                : idx === 1
                ? locale === "ar"
                  ? "جوي"
                  : "Air"
                : idx === 2
                ? locale === "ar"
                  ? "بحري"
                  : "Sea"
                : idx === 3
                ? locale === "ar"
                  ? "الميناء"
                  : "Port"
                : locale === "ar"
                ? "بري"
                : "Road";

            return (
              <button
                key={stage.key}
                type="button"
                onClick={() =>
                  setLockedStage(lockedStage === idx ? null : idx)
                }
                className={cn(
                  "inline-flex h-7 items-center gap-1 rounded-lg border px-2 text-[11px] font-semibold transition-all",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-elevated)]/80 text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                )}
              >
                <Icon className="h-3 w-3" />
                <span>{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
