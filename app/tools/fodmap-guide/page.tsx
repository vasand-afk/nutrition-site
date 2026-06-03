"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  MinusCircle,
  AlertTriangle,
  FlaskConical,
  Leaf,
  Info,
} from "lucide-react";
import {
  FODMAP_CATEGORIES,
  REINTRODUCTION_CHALLENGES,
  LAB_MARKERS,
  SIBO_TIME_POINTS,
  interpretSIBO,
  type Zone,
  type ReintroStatus,
  type LabPanel,
} from "@/lib/fodmap-data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "roadmap" | "traffic" | "labs";
type Phase = 1 | 2 | 3;

const GI_CONDITIONS = ["IBS", "IBD", "SIBO", "Crohn's Disease", "Ulcerative Colitis", "GERD"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ZONE_STYLE: Record<Zone, { badge: string; dot: string; bg: string; border: string; label: string }> = {
  green: {
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    label: "Low FODMAP",
  },
  yellow: {
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
    bg: "bg-amber-50",
    border: "border-amber-200",
    label: "Moderate — portion matters",
  },
  red: {
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    label: "High FODMAP — avoid in Phase 1",
  },
};

const STATUS_CONFIG: Record<
  Exclude<ReintroStatus, "untested">,
  { label: string; icon: React.ReactNode; color: string }
> = {
  tolerated: { label: "Tolerated", icon: <CheckCircle size={14} />, color: "bg-green-100 text-green-800 border-green-300" },
  partial: { label: "Partial", icon: <MinusCircle size={14} />, color: "bg-amber-100 text-amber-800 border-amber-300" },
  trigger: { label: "Trigger", icon: <XCircle size={14} />, color: "bg-red-100 text-red-800 border-red-300" },
};

function interpretLabValue(
  marker: (typeof LAB_MARKERS)[number],
  rawValue: string
): { status: string; color: string; text: string } | null {
  const v = parseFloat(rawValue);
  if (isNaN(v)) return null;

  const { normalLow, normalHigh, criticalLow, criticalHigh, borderlineHighStart } = marker;

  if (criticalLow !== undefined && v < criticalLow) {
    return {
      status: "Critical Low",
      color: "text-red-700 bg-red-50 border-red-200",
      text: marker.interpreterations.critical_low ?? marker.interpreterations.low ?? "",
    };
  }
  if (v < normalLow) {
    return {
      status: "Below range",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      text: marker.interpreterations.low ?? "",
    };
  }
  if (criticalHigh !== undefined && v > criticalHigh) {
    return {
      status: "Critical High",
      color: "text-red-700 bg-red-50 border-red-200",
      text: marker.interpreterations.critical_high ?? marker.interpreterations.high ?? "",
    };
  }
  if (borderlineHighStart !== undefined && v > borderlineHighStart) {
    return {
      status: "Above range",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      text: marker.interpreterations.borderline_high ?? marker.interpreterations.high ?? "",
    };
  }
  if (v > normalHigh) {
    return {
      status: "Above range",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      text: marker.interpreterations.high ?? "",
    };
  }
  return {
    status: "Normal",
    color: "text-green-700 bg-green-50 border-green-200",
    text: marker.interpreterations.normal,
  };
}

// ─── SIBO SVG Chart ───────────────────────────────────────────────────────────

function SIBOChart({ h2, ch4 }: { h2: number[]; ch4: number[] }) {
  const W = 400;
  const H = 160;
  const PAD = { top: 10, right: 20, bottom: 30, left: 36 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const allVals = [...h2, ...ch4].filter((v) => !isNaN(v));
  const maxY = Math.max(50, ...allVals) + 10;

  const xPos = (i: number) => PAD.left + (i / (SIBO_TIME_POINTS.length - 1)) * chartW;
  const yPos = (v: number) => PAD.top + chartH - (v / maxY) * chartH;

  const line = (vals: number[]) =>
    vals
      .map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`)
      .join(" ");

  const yTicks = [0, 10, 20, Math.ceil(maxY / 2), maxY].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="SIBO breath test chart">
      {/* Grid */}
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={yPos(t)}
            y2={yPos(t)}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text x={PAD.left - 4} y={yPos(t) + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
            {t}
          </text>
        </g>
      ))}
      {/* Threshold lines */}
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={yPos(20)}
        y2={yPos(20)}
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={yPos(10)}
        y2={yPos(10)}
        stroke="#f97316"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      {/* H2 line */}
      <path d={line(h2)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
      {h2.map((v, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(v)} r="3" fill="#3b82f6" />
      ))}
      {/* CH4 line */}
      <path d={line(ch4)} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
      {ch4.map((v, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(v)} r="3" fill="#f97316" />
      ))}
      {/* X axis labels */}
      {SIBO_TIME_POINTS.map((t, i) => (
        <text
          key={t}
          x={xPos(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize="9"
          fill="#9ca3af"
        >
          {t}m
        </text>
      ))}
      {/* Legend */}
      <circle cx={PAD.left} cy={PAD.top - 2} r="3" fill="#3b82f6" />
      <text x={PAD.left + 6} y={PAD.top + 2} fontSize="9" fill="#6b7280">H₂ ppm</text>
      <circle cx={PAD.left + 60} cy={PAD.top - 2} r="3" fill="#f97316" />
      <text x={PAD.left + 66} y={PAD.top + 2} fontSize="9" fill="#6b7280">CH₄ ppm</text>
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function FODMAPGuidePage() {
  const [tab, setTab] = useState<Tab>("roadmap");
  const [phase, setPhase] = useState<Phase>(1);
  const [reintroResults, setReintroResults] = useState<Record<string, ReintroStatus>>({});
  const [conditions, setConditions] = useState<string[]>([]);
  const [personalTriggers, setPersonalTriggers] = useState<string[]>([]);
  const [labValues, setLabValues] = useState<Record<string, string>>({});
  const [expandedPanel, setExpandedPanel] = useState<LabPanel | null>("inflammation");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
  const [h2Input, setH2Input] = useState<string[]>(["", "", "", "", "", ""]);
  const [ch4Input, setCh4Input] = useState<string[]>(["", "", "", "", "", ""]);
  const [microbiome, setMicrobiome] = useState<Record<string, string>>({});

  // Hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("fodmap-guide");
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      if (s.phase) setPhase(s.phase);
      if (s.reintroResults) setReintroResults(s.reintroResults);
      if (s.conditions) setConditions(s.conditions);
      if (s.personalTriggers) setPersonalTriggers(s.personalTriggers);
      if (s.labValues) setLabValues(s.labValues);
      if (s.h2Input) setH2Input(s.h2Input);
      if (s.ch4Input) setCh4Input(s.ch4Input);
      if (s.microbiome) setMicrobiome(s.microbiome);
    } catch {
      // ignore corrupted state
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(
      "fodmap-guide",
      JSON.stringify({ phase, reintroResults, conditions, personalTriggers, labValues, h2Input, ch4Input, microbiome })
    );
  }, [phase, reintroResults, conditions, personalTriggers, labValues, h2Input, ch4Input, microbiome]);

  // Merge Phase-2 triggers into personal triggers list
  const effectiveTriggers = useMemo(() => {
    const phase2 = Object.entries(reintroResults)
      .filter(([, s]) => s === "trigger")
      .map(([id]) => {
        const challenge = REINTRODUCTION_CHALLENGES.find((c) => c.id === id);
        return challenge?.categoryId ?? null;
      })
      .filter(Boolean) as string[];
    return Array.from(new Set([...personalTriggers, ...phase2]));
  }, [personalTriggers, reintroResults]);

  // SIBO interpretation
  const siboResult = useMemo(() => {
    const h2 = h2Input.map(Number);
    const ch4 = ch4Input.map(Number);
    if (h2.every((v) => v === 0) && ch4.every((v) => v === 0)) return null;
    if (h2.some(isNaN) || ch4.some(isNaN)) return null;
    return interpretSIBO(h2, ch4);
  }, [h2Input, ch4Input]);

  // Out-of-range lab summary
  const labAlerts = useMemo(() => {
    return LAB_MARKERS.filter((m) => {
      const r = interpretLabValue(m, labValues[m.id] ?? "");
      return r && r.status !== "Normal";
    });
  }, [labValues]);

  // ─── Render helpers ──────────────────────────────────────────────────────────

  function toggleTrigger(categoryId: string) {
    setPersonalTriggers((prev) =>
      prev.includes(categoryId) ? prev.filter((x) => x !== categoryId) : [...prev, categoryId]
    );
  }

  // ─── Roadmap tab ─────────────────────────────────────────────────────────────

  const roadmapContent = (
    <div className="space-y-4">
      {/* Phase selector */}
      <div className="grid grid-cols-3 gap-3">
        {(
          [
            { p: 1, label: "Phase 1", sub: "Elimination", desc: "4–8 weeks" },
            { p: 2, label: "Phase 2", sub: "Reintroduction", desc: "8–12 weeks" },
            { p: 3, label: "Phase 3", sub: "Personalisation", desc: "Long-term" },
          ] as const
        ).map(({ p, label, sub, desc }) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`rounded-xl p-4 text-left border transition-all ${
              phase === p
                ? "bg-[#1B2A4A] text-white border-[#1B2A4A]"
                : "bg-white text-[#1B2A4A] border-gray-100 hover:border-[#2D6A4F]"
            }`}
          >
            <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${phase === p ? "text-[#C9A84C]" : "text-[#2D6A4F]"}`}>
              {label}
            </div>
            <div className="font-serif font-bold text-sm">{sub}</div>
            <div className={`text-xs mt-0.5 ${phase === p ? "text-white/60" : "text-gray-400"}`}>{desc}</div>
          </button>
        ))}
      </div>

      {/* Phase 1 */}
      {phase === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B2A4A] mb-1">
              Phase 1 — Strict Low-FODMAP Elimination
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Remove ALL high-FODMAP foods for <strong>4–8 weeks</strong> (no longer — unnecessarily prolonged elimination can harm microbiome diversity). The goal is symptom control, not a permanent diet.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Remove</p>
              <ul className="space-y-1 text-sm text-red-800">
                {["Garlic, onion, leek (bulb)", "Wheat, rye, barley", "Apple, pear, mango, honey", "Regular milk, yogurt, soft cheese", "Legumes (unrinsed)", "Mushrooms, cauliflower", "Stone fruits (peach, plum, cherry)"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Keep / Replace with</p>
              <ul className="space-y-1 text-sm text-green-800">
                {["Rice, oats, quinoa, corn", "Long-fermented sourdough", "Lactose-free dairy", "Berries, citrus, kiwi, banana", "Firm tofu, tempeh, peanuts", "Zucchini, carrot, capsicum, kale", "Garlic-infused oil (FODMAPs don't transfer to oil)"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#1B2A4A]/5 rounded-xl p-4">
            <p className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wider mb-2">Clinical reminders</p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {[
                "Stick to 4–8 weeks — longer restriction reduces microbial diversity.",
                "Keep a symptom diary: rate each day 0–10 and note stool form.",
                "If symptoms don't improve >50%, review for other diagnoses.",
                "Work with a dietitian experienced in FODMAP — miss-and-hit lists cause unnecessary restriction.",
                "FODMAP content depends on ripeness and cooking method — ripe banana is higher FODMAP than firm banana.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><Info size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setPhase(2)}
            className="w-full py-2.5 bg-[#2D6A4F] text-white text-sm font-semibold rounded-xl hover:bg-[#1B2A4A] transition-colors"
          >
            Move to Phase 2 — Reintroduction →
          </button>
        </div>
      )}

      {/* Phase 2 */}
      {phase === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B2A4A] mb-1">
              Phase 2 — Systematic Reintroduction
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Test one FODMAP category at a time. Follow the protocol below — one challenge per week with a washout period in between. Mark your result after each challenge.
            </p>
          </div>

          <div className="space-y-3">
            {REINTRODUCTION_CHALLENGES.map((challenge, idx) => {
              const result = reintroResults[challenge.id] ?? "untested";
              const isExpanded = expandedChallenge === challenge.id;

              return (
                <div
                  key={challenge.id}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    result === "trigger"
                      ? "border-red-200"
                      : result === "tolerated"
                      ? "border-green-200"
                      : result === "partial"
                      ? "border-amber-200"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 p-4">
                    <span className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1B2A4A] text-sm">{challenge.name}</div>
                      <div className="text-xs text-gray-400 truncate">Test food: {challenge.testFood} · {challenge.testAmount}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {result !== "untested" && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_CONFIG[result].color}`}>
                          {STATUS_CONFIG[result].icon}
                          {STATUS_CONFIG[result].label}
                        </span>
                      )}
                      <button onClick={() => setExpandedChallenge(isExpanded ? null : challenge.id)} className="text-gray-400 hover:text-[#1B2A4A]">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-50 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3 mb-1">Protocol</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{challenge.protocol}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Watch for</p>
                        <div className="flex flex-wrap gap-1.5">
                          {challenge.watchFor.map((s) => (
                            <span key={s} className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My result</p>
                        <div className="flex gap-2">
                          {(["tolerated", "partial", "trigger"] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() =>
                                setReintroResults((prev) => ({
                                  ...prev,
                                  [challenge.id]: prev[challenge.id] === s ? "untested" : s,
                                }))
                              }
                              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                                result === s
                                  ? STATUS_CONFIG[s].color
                                  : "border-gray-200 text-gray-500 hover:border-gray-300"
                              }`}
                            >
                              {STATUS_CONFIG[s].icon}
                              {STATUS_CONFIG[s].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setPhase(3)}
            className="w-full py-2.5 bg-[#2D6A4F] text-white text-sm font-semibold rounded-xl hover:bg-[#1B2A4A] transition-colors"
          >
            Move to Phase 3 — Personalisation →
          </button>
        </div>
      )}

      {/* Phase 3 */}
      {phase === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B2A4A] mb-1">
              Phase 3 — Your Personalised Diet
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Based on your Phase 2 results, you can now reintroduce tolerated foods and maintain the lowest level of restriction that keeps your symptoms controlled.
            </p>
          </div>

          {REINTRODUCTION_CHALLENGES.length > 0 && (
            <div className="space-y-2">
              {(["tolerated", "partial", "trigger", "untested"] as const).map((status) => {
                const challenges = REINTRODUCTION_CHALLENGES.filter(
                  (c) => (reintroResults[c.id] ?? "untested") === status
                );
                if (challenges.length === 0) return null;
                const config = {
                  tolerated: { label: "Freely reintroduce", color: "bg-green-50 border-green-200", textColor: "text-green-800", badge: "bg-green-100 text-green-800" },
                  partial: { label: "Small portions okay", color: "bg-amber-50 border-amber-200", textColor: "text-amber-800", badge: "bg-amber-100 text-amber-800" },
                  trigger: { label: "Continue to avoid", color: "bg-red-50 border-red-200", textColor: "text-red-800", badge: "bg-red-100 text-red-800" },
                  untested: { label: "Not yet tested", color: "bg-gray-50 border-gray-200", textColor: "text-gray-600", badge: "bg-gray-100 text-gray-600" },
                };
                const cfg = config[status];
                return (
                  <div key={status} className={`rounded-xl border p-4 ${cfg.color}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${cfg.textColor}`}>
                      {cfg.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {challenges.map((c) => (
                        <span key={c.id} className={`px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge}`}>
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-[#1B2A4A]/5 rounded-xl p-4">
            <p className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wider mb-2">Phase 3 goals</p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {[
                "Aim for the broadest diet possible — restriction beyond what's needed harms microbiome diversity.",
                "Retest 'trigger' foods every 6–12 months — tolerance can improve as gut health improves.",
                "Focus on increasing plant diversity (target 30+ different plants per week).",
                "Partial-tolerance foods may be okay in small quantities or with digestive enzymes (e.g. lactase).",
                "Stress, sleep, and dysbiosis all affect FODMAP tolerance — your threshold can change over time.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><Leaf size={13} className="text-[#2D6A4F] mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  // ─── Traffic Light tab ───────────────────────────────────────────────────────

  const trafficContent = (
    <div className="space-y-4">
      {/* Condition filter */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Filter for my conditions
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
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {effectiveTriggers.length > 0 && (
          <p className="text-xs text-amber-700 mt-2 flex items-center gap-1">
            <AlertTriangle size={12} />
            Your personal triggers: {effectiveTriggers.map((id) => FODMAP_CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(", ")}
          </p>
        )}
      </div>

      {FODMAP_CATEGORIES.map((cat) => {
        const isOpen = expandedCategory === cat.id;
        const isTrigger = effectiveTriggers.includes(cat.id);
        const conditionMatch =
          conditions.length === 0 ||
          cat.conditions.some((c) =>
            conditions.some((sel) => sel.toLowerCase().includes(c.toLowerCase()))
          );

        return (
          <div
            key={cat.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors ${
              isTrigger ? "border-red-300" : conditionMatch && conditions.length > 0 ? "border-[#2D6A4F]/40" : "border-gray-100"
            }`}
          >
            <button
              onClick={() => setExpandedCategory(isOpen ? null : cat.id)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif font-bold text-[#1B2A4A]">{cat.name}</span>
                  <span className="px-2 py-0.5 bg-[#1B2A4A]/8 text-[#1B2A4A] text-xs rounded-full">
                    {cat.fodmapType}
                  </span>
                  {isTrigger && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      ⚠ Your trigger
                    </span>
                  )}
                  {conditionMatch && conditions.length > 0 && !isTrigger && (
                    <span className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs rounded-full">
                      Relevant for you
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{cat.mainTrigger}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-1">
                  {(["green", "yellow", "red"] as Zone[]).map((z) => {
                    const count = cat.foods.filter((f) => f.zone === z).length;
                    return count > 0 ? (
                      <span key={z} className={`w-2 h-2 rounded-full ${ZONE_STYLE[z].dot}`} />
                    ) : null;
                  })}
                </div>
                {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-gray-50 px-5 pb-5 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed mt-3">{cat.description}</p>

                {(["red", "yellow", "green"] as Zone[]).map((zone) => {
                  const foods = cat.foods.filter((f) => f.zone === zone);
                  if (foods.length === 0) return null;
                  return (
                    <div key={zone}>
                      <p className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                        zone === "green" ? "text-green-700" : zone === "yellow" ? "text-amber-700" : "text-red-700"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${ZONE_STYLE[zone].dot}`} />
                        {ZONE_STYLE[zone].label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {foods.map((food) => (
                          <span
                            key={food.name}
                            title={[food.portion, food.note].filter(Boolean).join(" · ") || undefined}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-default ${ZONE_STYLE[zone].badge} ${
                              food.note || food.portion ? "underline decoration-dotted" : ""
                            }`}
                          >
                            {food.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Safe alternatives
                    </p>
                    <p className="text-xs text-gray-500">{cat.safeAlternatives.join(" · ")}</p>
                  </div>
                  <button
                    onClick={() => toggleTrigger(cat.id)}
                    className={`ml-3 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      personalTriggers.includes(cat.id)
                        ? "bg-red-100 text-red-800 border-red-300"
                        : "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600"
                    }`}
                  >
                    {personalTriggers.includes(cat.id) ? "⚠ Marked as trigger" : "Mark as my trigger"}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── Labs tab ─────────────────────────────────────────────────────────────────

  const PANEL_META: Record<LabPanel, { label: string; icon: React.ReactNode; description: string }> = {
    inflammation: {
      label: "GI Inflammation Markers",
      icon: <AlertTriangle size={16} className="text-red-500" />,
      description: "Distinguishes IBS from IBD and monitors disease activity.",
    },
    nutrients: {
      label: "Nutrient Deficiencies",
      icon: <Leaf size={16} className="text-green-600" />,
      description: "Common deficiencies in GI disease due to malabsorption and blood loss.",
    },
    sibo: {
      label: "SIBO Breath Test",
      icon: <FlaskConical size={16} className="text-blue-600" />,
      description: "H₂ and CH₄ values from a lactulose or glucose hydrogen breath test.",
    },
    microbiome: {
      label: "Stool Microbiome",
      icon: <FlaskConical size={16} className="text-purple-600" />,
      description: "Results from commercial stool microbiome testing (e.g. Biomesight, Genova, Viome).",
    },
  };

  const labsContent = (
    <div className="space-y-4">
      {/* Out-of-range summary */}
      {labAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
            Values outside reference range
          </p>
          <div className="flex flex-wrap gap-1.5">
            {labAlerts.map((m) => (
              <span key={m.id} className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                {m.name}
              </span>
            ))}
          </div>
          <p className="text-xs text-amber-700 mt-2">Hover over or expand each panel to see interpretation.</p>
        </div>
      )}

      {(["inflammation", "nutrients", "sibo", "microbiome"] as LabPanel[]).map((panel) => {
        const meta = PANEL_META[panel];
        const isOpen = expandedPanel === panel;
        const markers = LAB_MARKERS.filter((m) => m.panel === panel);

        return (
          <div key={panel} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedPanel(isOpen ? null : panel)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left"
            >
              <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {meta.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1B2A4A] text-sm">{meta.label}</div>
                <div className="text-xs text-gray-400">{meta.description}</div>
              </div>
              {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
            </button>

            {isOpen && (
              <div className="border-t border-gray-50 px-5 pb-5 space-y-5">
                {panel !== "sibo" && panel !== "microbiome" && markers.map((marker) => {
                  const result = interpretLabValue(marker, labValues[marker.id] ?? "");
                  return (
                    <div key={marker.id}>
                      <div className="flex items-center justify-between mb-1.5 mt-4">
                        <label className="text-sm font-semibold text-[#1B2A4A]">{marker.name}</label>
                        <span className="text-xs text-gray-400">{marker.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="any"
                          placeholder="Enter value"
                          value={labValues[marker.id] ?? ""}
                          onChange={(e) =>
                            setLabValues((prev) => ({ ...prev, [marker.id]: e.target.value }))
                          }
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#2D6A4F]"
                        />
                        <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
                          Ref: {marker.normalLow}–{marker.normalHigh}
                        </span>
                      </div>
                      {result && (
                        <div className={`mt-2 rounded-lg border px-3 py-2 ${result.color}`}>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs font-semibold">{result.status}</span>
                          </div>
                          <p className="text-xs leading-relaxed">{result.text}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{marker.giNote}</p>
                    </div>
                  );
                })}

                {/* SIBO breath test */}
                {panel === "sibo" && (
                  <div className="mt-4 space-y-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Enter ppm (parts per million) values at each time point from your lactulose or glucose hydrogen breath test.
                    </p>
                    <div className="grid grid-cols-6 gap-1.5 text-center">
                      {SIBO_TIME_POINTS.map((t) => (
                        <div key={t} className="text-xs text-gray-400 font-medium">{t}m</div>
                      ))}
                      {SIBO_TIME_POINTS.map((t, i) => (
                        <div key={`h2-${t}`} className="relative">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            placeholder="H₂"
                            value={h2Input[i]}
                            onChange={(e) => {
                              const next = [...h2Input];
                              next[i] = e.target.value;
                              setH2Input(next);
                            }}
                            className="w-full px-1 py-1.5 rounded-lg border border-blue-200 text-xs text-center text-gray-800 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                      ))}
                      {SIBO_TIME_POINTS.map((t, i) => (
                        <div key={`ch4-${t}`}>
                          <input
                            type="number"
                            step="1"
                            min="0"
                            placeholder="CH₄"
                            value={ch4Input[i]}
                            onChange={(e) => {
                              const next = [...ch4Input];
                              next[i] = e.target.value;
                              setCh4Input(next);
                            }}
                            className="w-full px-1 py-1.5 rounded-lg border border-orange-200 text-xs text-center text-gray-800 focus:outline-none focus:border-orange-400"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block" /> H₂ (hydrogen)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-400 inline-block" /> CH₄ (methane)</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-px bg-blue-400 border-t border-dashed inline-block" /> H₂ threshold (20 ppm)</span>
                    </div>

                    {h2Input.some((v) => v !== "") || ch4Input.some((v) => v !== "") ? (
                      <SIBOChart
                        h2={h2Input.map((v) => (v === "" ? 0 : Number(v)))}
                        ch4={ch4Input.map((v) => (v === "" ? 0 : Number(v)))}
                      />
                    ) : null}

                    {siboResult && (
                      <div className={`rounded-xl border p-4 ${
                        siboResult.h2Positive || siboResult.ch4Positive
                          ? "bg-red-50 border-red-200"
                          : "bg-green-50 border-green-200"
                      }`}>
                        <p className={`font-semibold text-sm mb-1 ${
                          siboResult.h2Positive || siboResult.ch4Positive ? "text-red-800" : "text-green-800"
                        }`}>
                          {siboResult.pattern}
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed">{siboResult.interpretation}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mt-1">{siboResult.detail}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Microbiome */}
                {panel === "microbiome" && (
                  <div className="mt-4 space-y-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Metrics vary by provider (Biomesight, Genova, Viome, Thryve, etc.). Enter values from your report and note the range or grade your provider uses.
                    </p>
                    {[
                      { id: "mb_diversity", label: "Microbiome Diversity Score", placeholder: "e.g. 6.2 / 10 or 'Low'" },
                      { id: "mb_fb_ratio", label: "Firmicutes / Bacteroidetes Ratio", placeholder: "e.g. 1.4 (normal 0.5–2.0)" },
                      { id: "mb_dysbiosis", label: "Dysbiosis Index", placeholder: "e.g. 2.1 (provider-specific scale)" },
                      { id: "mb_pathogens", label: "Flagged Pathogens / Pathobionts", placeholder: "e.g. Clostridioides difficile, E. coli (elevated)" },
                      { id: "mb_commensals", label: "Low Beneficial Bacteria", placeholder: "e.g. Lactobacillus spp., Akkermansia muciniphila (low)" },
                      { id: "mb_notes", label: "Additional Notes", placeholder: "Other findings from your report..." },
                    ].map(({ id, label, placeholder }) => (
                      <div key={id}>
                        <label className="text-xs font-semibold text-[#1B2A4A] block mb-1">{label}</label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={microbiome[id] ?? ""}
                          onChange={(e) => setMicrobiome((prev) => ({ ...prev, [id]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#2D6A4F]"
                        />
                      </div>
                    ))}
                    <div className="bg-[#1B2A4A]/5 rounded-xl p-3 space-y-1.5">
                      <p className="text-xs font-semibold text-[#1B2A4A]">Key clinical benchmarks</p>
                      {[
                        "Diversity: higher is generally better — correlates with IBS symptom severity inversely.",
                        "F/B ratio 0.5–2.0 is considered normal; high ratios linked to IBD and metabolic disease.",
                        "Akkermansia muciniphila low = impaired mucosal barrier — target with polyphenols, fasting.",
                        "Faecalibacterium prausnitzii low = reduced butyrate production — target with high-fibre diet.",
                        "Microbiome testing is not yet a clinical diagnostic standard — interpret with your gastroenterologist.",
                      ].map((t) => (
                        <p key={t} className="text-xs text-gray-600 flex items-start gap-1.5"><Info size={11} className="text-[#C9A84C] mt-0.5 shrink-0" />{t}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── Page ─────────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF7]">
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-2">
              Clinical · Evidence-Based · Personalised
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              FODMAP Protocol Companion
            </h1>
            <p className="text-white/65 text-sm leading-relaxed max-w-lg">
              Navigate the three-phase FODMAP protocol, identify your personal triggers,
              and track your lab markers — all in one place. Data stays on your device.
            </p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-6">
            {(
              [
                { id: "roadmap", label: "My Phase" },
                { id: "traffic", label: "Food Traffic Light" },
                { id: "labs", label: "My Lab Results" },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                  tab === id
                    ? "bg-[#1B2A4A] text-white"
                    : "text-gray-500 hover:text-[#1B2A4A]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "roadmap" && roadmapContent}
          {tab === "traffic" && trafficContent}
          {tab === "labs" && labsContent}
        </div>
      </main>
      <Footer />
    </>
  );
}
