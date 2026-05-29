"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";

type Goal = "lose" | "maintain" | "gain";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";

const activityMultipliers: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const activityLabels: Record<Activity, string> = {
  sedentary: "Sedentary (desk job, little exercise)",
  light: "Lightly active (1–3 days/week exercise)",
  moderate: "Moderately active (3–5 days/week)",
  active: "Very active (6–7 days/week)",
  very_active: "Extremely active (physical job + training)",
};

const goalAdjust: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

function calcBMR(weight: number, height: number, age: number, sex: "male" | "female") {
  if (sex === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<"male" | "female">("female");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [result, setResult] = useState<null | { tdee: number; target: number; protein: number; carbs: number; fat: number }>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);

    if (!a || !w || !h || a < 15 || a > 100 || w < 30 || w > 300 || h < 100 || h > 250) {
      setError("Please enter valid values: age 15–100, weight 30–300 kg, height 100–250 cm.");
      return;
    }
    setError("");

    const bmr = calcBMR(w, h, a, sex);
    const tdee = Math.round(bmr * activityMultipliers[activity]);
    const target = tdee + goalAdjust[goal];
    const protein = Math.round(w * 1.6);
    const fat = Math.round((target * 0.28) / 9);
    const carbs = Math.round((target - protein * 4 - fat * 9) / 4);

    setResult({ tdee, target, protein, carbs, fat });
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-[#2D6A4F] hover:underline mb-6">
          <ArrowLeft size={14} /> Back to Tools
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-2">
          Calorie & Macro Calculator
        </h1>
        <p className="text-gray-500 mb-8">
          Based on the Mifflin–St Jeor equation — the most validated formula for estimating
          resting metabolic rate in clinical nutrition practice.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <form onSubmit={calculate} className="space-y-6">
            {/* Sex */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2A4A] mb-2">Biological Sex</label>
              <div className="flex gap-3">
                {(["female", "male"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 rounded-md text-sm font-medium border transition-colors capitalize ${
                      sex === s
                        ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#1B2A4A]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Age", unit: "years", value: age, set: setAge, min: "15", max: "100" },
                { label: "Weight", unit: "kg", value: weightKg, set: setWeightKg, min: "30", max: "300" },
                { label: "Height", unit: "cm", value: heightCm, set: setHeightCm, min: "100", max: "250" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-semibold text-[#1B2A4A] mb-1">
                    {f.label} <span className="text-gray-400 font-normal">({f.unit})</span>
                  </label>
                  <input
                    type="number"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    min={f.min}
                    max={f.max}
                    placeholder="—"
                    className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Activity */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2A4A] mb-2">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as Activity)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm bg-white"
              >
                {(Object.entries(activityLabels) as [Activity, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2A4A] mb-2">Goal</label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: "lose", label: "Lose Weight", sub: "−500 kcal" },
                  { value: "maintain", label: "Maintain Weight", sub: "±0 kcal" },
                  { value: "gain", label: "Gain Muscle", sub: "+300 kcal" },
                ] as { value: Goal; label: string; sub: string }[]).map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGoal(g.value)}
                    className={`py-3 px-2 rounded-md border text-center transition-colors ${
                      goal === g.value
                        ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#1B2A4A]"
                    }`}
                  >
                    <p className="text-xs font-semibold">{g.label}</p>
                    <p className={`text-xs mt-0.5 ${goal === g.value ? "text-white/60" : "text-gray-400"}`}>{g.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-[#2D6A4F] text-white font-semibold rounded-md hover:bg-[#40916C] transition-colors"
            >
              Calculate My Targets
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-[#1B2A4A] rounded-2xl p-6 md:p-8 text-white">
              <h2 className="font-serif text-xl font-bold mb-4">Your Personalised Results</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Maintenance Calories (TDEE)</p>
                  <p className="font-serif text-3xl font-bold text-white">{result.tdee.toLocaleString()}</p>
                  <p className="text-white/50 text-xs mt-0.5">kcal / day</p>
                </div>
                <div className="bg-[#C9A84C]/20 border border-[#C9A84C]/30 rounded-xl p-4">
                  <p className="text-[#C9A84C] text-xs uppercase tracking-wider mb-1">
                    {goal === "lose" ? "Weight Loss" : goal === "gain" ? "Muscle Gain" : "Maintenance"} Target
                  </p>
                  <p className="font-serif text-3xl font-bold text-white">{result.target.toLocaleString()}</p>
                  <p className="text-white/50 text-xs mt-0.5">kcal / day</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-4">Macronutrient Breakdown</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Protein", value: result.protein, unit: "g", color: "bg-blue-50 border-blue-100", text: "text-blue-700", note: "1.6 g/kg body weight" },
                  { label: "Carbohydrates", value: result.carbs, unit: "g", color: "bg-amber-50 border-amber-100", text: "text-amber-700", note: "Remainder of calories" },
                  { label: "Fat", value: result.fat, unit: "g", color: "bg-rose-50 border-rose-100", text: "text-rose-700", note: "28% of total calories" },
                ].map((m) => (
                  <div key={m.label} className={`${m.color} border rounded-xl p-4 text-center`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${m.text} mb-1`}>{m.label}</p>
                    <p className="font-serif text-2xl font-bold text-[#1B2A4A]">{m.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.unit}/day</p>
                    <p className="text-xs text-gray-400 mt-1">{m.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#FAFAF7] border border-gray-200 rounded-xl p-4">
              <Info size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed">
                These are estimates based on population averages. Individual metabolic rate can
                vary ±15%. If you have a GI condition, consult a registered dietitian before
                making significant dietary changes.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
