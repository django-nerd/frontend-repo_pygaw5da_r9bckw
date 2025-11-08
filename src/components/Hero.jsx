import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/60 to-black" />
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-900/30 px-4 py-1 text-red-200/90">
            <Rocket className="h-4 w-4" />
            <span className="text-xs tracking-wide">Gamified Habit Tracker</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Forge Elite Habits
          </h1>
          <p className="mt-3 text-red-200/80">
            Level up with EXP, earn Gold, and unlock custom rewards. Train across Health, Productivity, Social, Personal Growth, Fitness, and Knowledge.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="rounded-lg bg-red-700/30 border border-red-500/40 px-3 py-1 text-xs text-red-200/90">
              Theme: Crimson × Obsidian
            </span>
            <span className="rounded-lg bg-red-700/30 border border-red-500/40 px-3 py-1 text-xs text-red-200/90">
              Character: Enjin-inspired palette
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
