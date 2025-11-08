import React, { useState } from 'react';
import { Gift, Coins } from 'lucide-react';

export default function RewardsStore({ gold, rewards, onAddReward, onClaimReward }) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(100);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || cost <= 0) return;
    onAddReward({ title: title.trim(), cost: Math.round(cost) });
    setTitle('');
    setCost(100);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 mt-8">
      <div className="rounded-2xl border border-red-500/30 bg-black/60 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-red-400" /> Reward Store
          </h2>
          <div className="inline-flex items-center gap-2 rounded-md border border-yellow-500/30 bg-yellow-900/20 px-3 py-1 text-yellow-200">
            <Coins className="h-4 w-4" />
            <span className="text-sm font-semibold">{gold} Gold</span>
          </div>
        </div>

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Watch a movie"
            className="rounded-md border border-red-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-red-300/40 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            min={1}
            className="rounded-md border border-red-500/30 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="rounded-md bg-gradient-to-r from-red-700 to-rose-700 px-4 py-2 text-sm font-semibold text-white shadow ring-1 ring-red-400/40 hover:from-red-600 hover:to-rose-600">
            Add Reward
          </button>
        </form>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.length === 0 && (
            <div className="col-span-full text-red-200/70">No rewards yet. Create your own to stay motivated.</div>
          )}
          {rewards.map((r) => (
            <div key={r.id} className="rounded-xl border border-red-500/30 bg-red-900/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{r.title}</h3>
                  <p className="text-xs text-yellow-200/80">Cost: {r.cost} Gold</p>
                </div>
                <button
                  disabled={gold < r.cost}
                  onClick={() => onClaimReward(r.id)}
                  className={
                    'rounded-md px-3 py-1.5 text-sm font-medium border transition ' +
                    (gold < r.cost
                      ? 'bg-red-900/20 border-red-700/60 text-red-300/70 cursor-not-allowed'
                      : 'bg-red-700/60 border-red-400 text-white hover:bg-red-600/70')
                  }
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
