import React, { useMemo, useState } from 'react';
import { Plus, CheckCircle2, CalendarDays } from 'lucide-react';

const CATEGORIES = [
  'Health',
  'Productivity',
  'Social',
  'Personal Growth',
  'Fitness',
  'Knowledge',
];

const DIFFICULTY_CONFIG = {
  'Very Easy': { exp: [3, 6], gold: [2, 4] },
  Easy: { exp: [5, 10], gold: [4, 8] },
  Medium: { exp: [12, 20], gold: [8, 15] },
  Hard: { exp: [25, 40], gold: [16, 30] },
  Epic: { exp: [50, 80], gold: [30, 60] },
};

function randInRange([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DayToggle({ value, selected, onToggle }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <button
      type="button"
      onClick={() => onToggle(value)}
      className={
        'h-8 w-8 rounded-md text-xs font-semibold transition border ' +
        (selected
          ? 'bg-red-600/60 border-red-400 text-white'
          : 'bg-red-900/20 border-red-700/60 text-red-200/80 hover:bg-red-800/30')
      }
      aria-pressed={selected}
    >
      {days[value]}
    </button>
  );
}

export default function HabitsPanel({
  habits,
  onAddHabit,
  onCompleteHabit,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [repeatMode, setRepeatMode] = useState('Daily');
  const [daysOfWeek, setDaysOfWeek] = useState([]); // 0=Sun ... 6=Sat

  const today = useMemo(() => new Date(), []);
  const todayIndex = today.getDay();
  const todayStr = today.toISOString().slice(0, 10);

  const toggleDay = (d) => {
    setDaysOfWeek((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const submit = (e) => {
    e.preventDefault();
    const plan = repeatMode === 'Daily' ? null : [...daysOfWeek].sort();
    if (!title.trim()) return;
    onAddHabit({
      title: title.trim(),
      category,
      difficulty,
      daysOfWeek: plan, // null => daily, array => specific days
    });
    setTitle('');
    setCategory(CATEGORIES[0]);
    setDifficulty('Easy');
    setRepeatMode('Daily');
    setDaysOfWeek([]);
  };

  const isScheduledToday = (h) => {
    if (!h.daysOfWeek) return true; // daily
    return h.daysOfWeek.includes(todayIndex);
  };

  const completedToday = (h) => h.history?.some((d) => d.date === todayStr);

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-2xl border border-red-500/30 bg-red-900/20 p-5 backdrop-blur-sm">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Plus className="h-5 w-5 text-red-400" />
            Create Habit
          </h2>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-red-200/80">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-red-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-red-300/40 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="e.g., Morning Stretch"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-red-200/80">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-red-500/30 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-red-200/80">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="mt-1 w-full rounded-md border border-red-500/30 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {Object.keys(DIFFICULTY_CONFIG).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-red-200/80">Repeat</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {['Daily', 'Custom Days'].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setRepeatMode(m)}
                    className={
                      'rounded-md px-3 py-2 text-sm border transition ' +
                      (repeatMode === m
                        ? 'bg-red-600/60 border-red-400 text-white'
                        : 'bg-red-900/20 border-red-700/60 text-red-200/80 hover:bg-red-800/30')
                    }
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {repeatMode === 'Custom Days' && (
              <div>
                <div className="mt-1 flex items-center gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                    <DayToggle
                      key={d}
                      value={d}
                      selected={daysOfWeek.includes(d)}
                      onToggle={toggleDay}
                    />
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-red-300/60 flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Choose one or more days
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-red-700 to-rose-700 px-4 py-2 text-sm font-semibold text-white shadow ring-1 ring-red-400/40 hover:from-red-600 hover:to-rose-600"
            >
              Add Habit
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-red-500/30 bg-black/60 p-5">
          <h2 className="text-white font-bold text-lg">Today's Habits</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.length === 0 && (
              <div className="col-span-full text-center text-red-200/70">
                No habits yet. Create one to begin your quest.
              </div>
            )}
            {habits.map((h) => {
              const scheduled = isScheduledToday(h);
              const done = completedToday(h);
              const cfg = DIFFICULTY_CONFIG[h.difficulty];
              return (
                <div
                  key={h.id}
                  className="rounded-xl border border-red-500/30 bg-red-900/10 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{h.title}</h3>
                      <p className="text-xs text-red-200/70">
                        {h.category} • {h.difficulty} • {h.daysOfWeek ? 'Specific Days' : 'Daily'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-red-300/70 block">Possible</span>
                      <span className="text-xs text-red-200">
                        EXP {cfg.exp[0]}-{cfg.exp[1]} · Gold {cfg.gold[0]}-{cfg.gold[1]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className={
                      'text-[11px] ' +
                      (scheduled ? 'text-green-300/80' : 'text-red-300/70')
                    }>
                      {scheduled ? 'Scheduled today' : 'Not scheduled today'}
                    </span>
                    <button
                      disabled={!scheduled || done}
                      onClick={() => {
                        const exp = randInRange(cfg.exp);
                        const gold = randInRange(cfg.gold);
                        onCompleteHabit(h.id, exp, gold);
                      }}
                      className={
                        'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition border ' +
                        (done
                          ? 'bg-green-800/30 border-green-500/40 text-green-200 cursor-not-allowed'
                          : scheduled
                          ? 'bg-red-700/60 border-red-400 text-white hover:bg-red-600/70'
                          : 'bg-red-900/20 border-red-700/60 text-red-300/70 cursor-not-allowed')
                      }
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {done ? 'Completed' : 'Complete'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
