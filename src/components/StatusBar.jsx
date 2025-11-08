import React from 'react';
import { Coins, Sword } from 'lucide-react';

export default function StatusBar({ level, exp, expToNext, gold }) {
  const pct = Math.min(100, Math.round((exp / expToNext) * 100));
  return (
    <div className="mx-auto w-full max-w-6xl px-4 -mt-10 relative z-10">
      <div className="rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-900/60 to-black/60 p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-700 to-rose-700 grid place-items-center ring-1 ring-red-400/50">
              <Sword className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-red-200/90 text-sm">Level</div>
              <div className="text-white text-2xl font-extrabold">{level}</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-red-200/90 text-sm">EXP {exp} / {expToNext}</div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-red-950/60 ring-1 ring-red-800/60">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-rose-600 to-orange-600"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-yellow-500/40 bg-yellow-900/20 px-4 py-2">
            <Coins className="h-5 w-5 text-yellow-300" />
            <span className="text-yellow-200 font-semibold">{gold} Gold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
