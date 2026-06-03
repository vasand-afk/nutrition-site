"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Plus,
  Loader2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Leaf,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Droplets,
  Activity,
  Sprout,
} from "lucide-react";

type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";
type Zone = "green" | "yellow" | "red";

interface FoodItem {
  name: string;
  color: Zone;
  reason: string;
}

interface MealAnalysis {
  description: string;
  color: Zone;
  score: number;
  fiber_g: number;
  diverse_plants: number;
  has_probiotics: boolean;
  has_prebiotics: boolean;
  fodmap_concern: boolean;
  anti_inflammatory: boolean;
  food_items: FoodItem[];
  insights: string[];
  summary: string;
}

const MEAL_SLOTS: { id: MealSlot; label: string; emoji: string; time: string }[] = [
  { id: "breakfast", label: "Breakfast", emoji: "🌅", time: "Morning" },
  { id: "lunch", label: "Lunch", emoji: "☀️", time: "Midday" },
  { id: "dinner", label: "Dinner", emoji: "🌙", time: "Evening" },
  { id: "snack", label: "Snacks", emoji: "🫐", time: "Throughout day" },
];

const GI_CONDITIONS = [
  "IBS",
  "IBD",
  "SIBO",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "GERD",
];

const ZONE = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500",
    label: "Gut-Supportive",
  },
  yellow: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
    label: "Neutral",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500",
    label: "Gut-Disrupting",
  },
};

export default function GutTrackerPage() {
  const [meals, setMeals] = useState<Partial<Record<MealSlot, MealAnalysis>>>({});
  const [conditions, setConditions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<MealSlot | null>(null);
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState<MealSlot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConditions, setShowConditions] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<MealSlot | null>(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem(`gut-tracker-${today}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMeals(parsed.meals ?? {});
        setConditions(parsed.conditions ?? []);
      } catch {
        // corrupted localStorage — start fresh
      }
    }
  }, [today]);

  useEffect(() => {
    localStorage.setItem(`gut-tracker-${today}`, JSON.stringify({ meals, conditions }));
  }, [meals, conditions, today]);

  async function analyzeMeal(slot: MealSlot) {
    if (!inputText.trim()) return;
    setAnalyzing(slot);
    setError(null);
    try {
      const res = await fetch("/api/analyze-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal: inputText, conditions }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMeals((prev) => ({ ...prev, [slot]: { ...data, description: inputText } }));
      setActiveInput(null);
      setInputText("");
      setExpandedMeal(slot);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Analysis failed — check .env.local for ANTHROPIC_API_KEY");
    } finally {
      setAnalyzing(null);
    }
  }

  function removeMeal(slot: MealSlot) {
    setMeals((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
    if (expandedMeal === slot) setExpandedMeal(null);
  }

  const logged = Object.values(meals) as MealAnalysis[];
  const avgScore =
    logged.length
      ? Math.round((logged.reduce((s, m) => s + m.score, 0) / logged.length) * 10) / 10
      : null;
  const totalFiber = logged.reduce((s, m) => s + (m.fiber_g ?? 0), 0);
  const totalPlants = logged.reduce((s, m) => s + (m.diverse_plants ?? 0), 0);
  const probioticMeals = logged.filter((m) => m.has_probiotics).length;
  const zoneCounts = logged.reduce(
    (acc, m) => ({ ...acc, [m.color]: acc[m.color] + 1 }),
    { green: 0, yellow: 0, red: 0 }
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF7]">
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-2">
              AI-Powered · Evidence-Based · Free
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Gut Health Food Tracker
            </h1>
            <p className="text-white/65 text-sm leading-relaxed max-w-lg">
              Describe what you ate and get instant clinical analysis — fiber, microbiome impact,
              FODMAP flags, and a personalised gut health score. Powered by Claude AI.
            </p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {/* Daily overview — only shown once something is logged */}
          {logged.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-lg font-bold text-[#1B2A4A]">
                  Today&rsquo;s Gut Health
                </h2>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-[#1B2A4A]">
                    {avgScore}
                  </span>
                  <span className="text-gray-400 text-sm"> / 10</span>
                </div>
              </div>

              {/* Noom-style color distribution bar */}
              <div className="flex h-3 rounded-full overflow-hidden gap-px mb-3">
                {(["green", "yellow", "red"] as Zone[]).map((z) =>
                  zoneCounts[z] > 0 ? (
                    <div
                      key={z}
                      className={`${ZONE[z].dot} transition-all duration-500`}
                      style={{ flex: zoneCounts[z] }}
                    />
                  ) : null
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                {(["green", "yellow", "red"] as Zone[]).map(
                  (z) =>
                    zoneCounts[z] > 0 && (
                      <span key={z} className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${ZONE[z].dot}`} />
                        {zoneCounts[z]} {ZONE[z].label}
                      </span>
                    )
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-50 text-center">
                <div>
                  <div className="font-bold text-[#1B2A4A]">{totalFiber.toFixed(0)}g</div>
                  <div className="text-xs text-gray-400">Fiber today</div>
                </div>
                <div>
                  <div className="font-bold text-[#1B2A4A]">{probioticMeals}</div>
                  <div className="text-xs text-gray-400">Probiotic meal{probioticMeals !== 1 ? "s" : ""}</div>
                </div>
                <div>
                  <div className="font-bold text-[#1B2A4A]">{totalPlants}</div>
                  <div className="text-xs text-gray-400">Plant varieties</div>
                </div>
              </div>
            </div>
          )}

          {/* GI conditions selector */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowConditions((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="min-w-0">
                <span className="font-semibold text-[#1B2A4A] text-sm">My GI Conditions</span>
                {conditions.length > 0 ? (
                  <span className="ml-2 text-xs text-[#2D6A4F] font-medium truncate">
                    {conditions.join(", ")}
                  </span>
                ) : (
                  <span className="ml-2 text-xs text-gray-400">
                    None — tap to personalise analysis
                  </span>
                )}
              </div>
              {showConditions ? (
                <ChevronUp size={16} className="text-gray-400 shrink-0 ml-2" />
              ) : (
                <ChevronDown size={16} className="text-gray-400 shrink-0 ml-2" />
              )}
            </button>

            {showConditions && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <p className="text-xs text-gray-400 mt-3 mb-3">
                  Enables tailored flags — e.g. FODMAP warnings for IBS, inflammation alerts for IBD.
                </p>
                <div className="flex flex-wrap gap-2">
                  {GI_CONDITIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setConditions((prev) =>
                          prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        conditions.includes(c)
                          ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Meal slots */}
          {MEAL_SLOTS.map(({ id, label, emoji, time }) => {
            const meal = meals[id];
            const isLogging = activeInput === id;
            const isAnalyzing = analyzing === id;
            const isExpanded = expandedMeal === id;

            return (
              <div
                key={id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors duration-200 ${
                  meal ? ZONE[meal.color].border : "border-gray-100"
                }`}
              >
                {/* Slot header */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{emoji}</span>
                    <div>
                      <div className="font-semibold text-[#1B2A4A] text-sm">{label}</div>
                      <div className="text-xs text-gray-400">{time}</div>
                    </div>
                  </div>

                  {meal && !isLogging && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${ZONE[meal.color].badge}`}
                      >
                        {meal.score}/10 · {ZONE[meal.color].label}
                      </span>
                      <button
                        onClick={() => removeMeal(id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                        title="Remove meal"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Analysis card */}
                {meal && !isLogging && (
                  <div
                    className={`px-5 pb-5 border-t ${ZONE[meal.color].border} ${ZONE[meal.color].bg}`}
                  >
                    <p className="text-sm text-gray-600 italic mt-3 mb-3">
                      &ldquo;{meal.description}&rdquo;
                    </p>

                    {/* Metric chips */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-full text-xs text-gray-600">
                        <Leaf size={11} className="text-green-600" />
                        {meal.fiber_g}g fiber
                      </span>
                      {meal.diverse_plants > 0 && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-full text-xs text-gray-600">
                          <Droplets size={11} className="text-blue-500" />
                          {meal.diverse_plants} plant{meal.diverse_plants !== 1 ? "s" : ""}
                        </span>
                      )}
                      {meal.has_probiotics && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-full text-xs text-green-700">
                          <CheckCircle size={11} /> Probiotic
                        </span>
                      )}
                      {meal.has_prebiotics && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-full text-xs text-green-700">
                          <Sprout size={11} /> Prebiotic
                        </span>
                      )}
                      {meal.anti_inflammatory && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-full text-xs text-blue-700">
                          <Activity size={11} /> Anti-inflammatory
                        </span>
                      )}
                      {meal.fodmap_concern && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 rounded-full text-xs text-amber-700">
                          <AlertTriangle size={11} /> FODMAP concern
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{meal.summary}</p>

                    {/* Expand/collapse detailed insights */}
                    <button
                      onClick={() => setExpandedMeal(isExpanded ? null : id)}
                      className="flex items-center gap-1 text-xs font-medium text-[#2D6A4F] hover:text-[#1B2A4A] transition-colors"
                    >
                      {isExpanded ? "Hide" : "Detailed"} analysis
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-3">
                        {/* Insights */}
                        <div className="space-y-1.5">
                          {meal.insights.map((insight, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Zap
                                size={11}
                                className="text-[#C9A84C] mt-0.5 shrink-0"
                              />
                              <p className="text-xs text-gray-600">{insight}</p>
                            </div>
                          ))}
                        </div>

                        {/* Per-food breakdown */}
                        {meal.food_items?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                              Food breakdown
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {meal.food_items.map((item, i) => (
                                <span
                                  key={i}
                                  title={item.reason}
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-default ${ZONE[item.color]?.badge ?? "bg-gray-100 text-gray-600"}`}
                                >
                                  {item.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Re-log */}
                        <button
                          onClick={() => {
                            setInputText(meal.description);
                            removeMeal(id);
                            setActiveInput(id);
                          }}
                          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#1B2A4A] transition-colors"
                        >
                          <RotateCcw size={11} /> Re-log this meal
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Text input for logging */}
                {isLogging && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <textarea
                      autoFocus
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={`Describe your ${label.toLowerCase()}… e.g. "Greek yogurt with blueberries and granola, black coffee"`}
                      className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#2D6A4F] resize-none"
                      rows={3}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) analyzeMeal(id);
                        if (e.key === "Escape") {
                          setActiveInput(null);
                          setInputText("");
                        }
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => analyzeMeal(id)}
                        disabled={!inputText.trim() || !!analyzing}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1B2A4A] text-white text-sm font-semibold rounded-xl hover:bg-[#2D6A4F] disabled:opacity-50 transition-colors"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 size={14} className="animate-spin" /> Analysing…
                          </>
                        ) : (
                          "Analyse Gut Impact"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setActiveInput(null);
                          setInputText("");
                        }}
                        className="px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 text-center">
                      ⌘↵ to analyse · Esc to cancel
                    </p>
                  </div>
                )}

                {/* Empty slot CTA */}
                {!meal && !isLogging && (
                  <div className="px-5 pb-4">
                    <button
                      onClick={() => {
                        setActiveInput(id);
                        setInputText("");
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
                    >
                      <Plus size={15} /> Log {label}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Zone legend */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-serif text-base font-bold text-[#1B2A4A] mb-3">
              The Three Zones
            </h3>
            <div className="space-y-3">
              {(
                [
                  {
                    zone: "green" as Zone,
                    title: "Green — Gut-Supportive",
                    desc: "High-fiber, prebiotic/probiotic, diverse plants, polyphenols. Feeds beneficial microbiota and reduces dysbiosis.",
                  },
                  {
                    zone: "yellow" as Zone,
                    title: "Yellow — Neutral",
                    desc: "Some processing, moderate fiber, no major GI concerns. Adequate — try swapping in a green food.",
                  },
                  {
                    zone: "red" as Zone,
                    title: "Red — Gut-Disrupting",
                    desc: "Ultra-processed, high added sugar, artificial additives, known GI triggers. May worsen dysbiosis or inflammation.",
                  },
                ] as const
              ).map(({ zone, title, desc }) => (
                <div key={zone} className="flex items-start gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${ZONE[zone].dot} mt-0.5 shrink-0`}
                  />
                  <div>
                    <p className={`text-sm font-semibold ${ZONE[zone].badge.split(" ")[1]}`}>
                      {title}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-50 pt-3">
              Scores reflect evidence from microbiome and GI research. Not a substitute for
              clinical advice from your gastroenterologist or dietitian.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
