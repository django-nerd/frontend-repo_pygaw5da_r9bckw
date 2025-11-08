import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import StatusBar from './components/StatusBar';
import HabitsPanel from './components/HabitsPanel';
import RewardsStore from './components/RewardsStore';
import StatsRadar from './components/StatsRadar';

// Simple local-storage persistence for demo purposes
const LS_KEY = 'habitquest_state_v1';

const defaultState = {
  level: 1,
  exp: 0,
  expToNext: 100,
  gold: 0,
  habits: [],
  rewards: [],
  stats: {
    Health: 0,
    Productivity: 0,
    Social: 0,
    'Personal Growth': 0,
    Fitness: 0,
    Knowledge: 0,
  },
};

function loadState() {
  try {
    const s = localStorage.getItem(LS_KEY);
    return s ? JSON.parse(s) : defaultState;
  } catch {
    return defaultState;
  }
}

function saveState(s) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {}
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function App() {
  const [state, setState] = useState(() => loadState());

  const setAndSave = (updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  };

  const addHabit = (h) => {
    setAndSave((s) => ({
      ...s,
      habits: [
        ...s.habits,
        { id: uid(), history: [], createdAt: Date.now(), ...h },
      ],
    }));
  };

  const completeHabit = (id, expGain, goldGain) => {
    setAndSave((s) => {
      const today = new Date().toISOString().slice(0, 10);
      let { level, exp, expToNext, gold, stats } = s;
      exp += expGain;
      gold += goldGain;
      // Level calculation: carry extra exp to next level; increase requirement by 20% per level
      while (exp >= expToNext) {
        exp -= expToNext;
        level += 1;
        expToNext = Math.round(expToNext * 1.2 + 25);
      }

      const habits = s.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              history: [...(h.history || []), { date: today, exp: expGain, gold: goldGain }],
            }
          : h
      );

      // Increment category stat capped at 100 for radar
      const cat = habits.find((h) => h.id === id)?.category;
      const newStats = { ...stats };
      if (cat) newStats[cat] = Math.min(100, (newStats[cat] || 0) + Math.round(expGain / 2));

      return { ...s, level, exp, expToNext, gold, habits, stats: newStats };
    });
  };

  const addReward = (r) => {
    setAndSave((s) => ({ ...s, rewards: [...s.rewards, { id: uid(), ...r }] }));
  };

  const claimReward = (id) => {
    setAndSave((s) => {
      const reward = s.rewards.find((r) => r.id === id);
      if (!reward || s.gold < reward.cost) return s;
      return { ...s, gold: s.gold - reward.cost };
    });
  };

  const todayHabits = useMemo(() => state.habits, [state.habits]);

  return (
    <div className="min-h-screen w-full bg-black text-white font-['Inter',sans-serif]">
      <Hero />
      <StatusBar level={state.level} exp={state.exp} expToNext={state.expToNext} gold={state.gold} />
      <div className="mt-8" />
      <HabitsPanel habits={todayHabits} onAddHabit={addHabit} onCompleteHabit={completeHabit} />
      <RewardsStore gold={state.gold} rewards={state.rewards} onAddReward={addReward} onClaimReward={claimReward} />
      <StatsRadar stats={state.stats} />
      <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-center text-xs text-red-300/60">
        Built with a crimson, maroon, and brown palette inspired by Enjin.
      </footer>
    </div>
  );
}
