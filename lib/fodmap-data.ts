export type Zone = "green" | "yellow" | "red";

export interface FoodItem {
  name: string;
  zone: Zone;
  portion?: string;
  note?: string;
}

export interface FODMAPCategory {
  id: string;
  name: string;
  fodmapType: string;
  description: string;
  mainTrigger: string;
  conditions: string[];
  foods: FoodItem[];
  safeAlternatives: string[];
}

export const FODMAP_CATEGORIES: FODMAPCategory[] = [
  {
    id: "fructans",
    name: "Fructans",
    fodmapType: "Oligosaccharides",
    description:
      "Chains of fructose found in wheat, garlic, onion, and many vegetables. The most common FODMAP trigger.",
    mainTrigger: "Bloating, gas, abdominal pain",
    conditions: ["IBS", "SIBO"],
    foods: [
      { name: "Garlic", zone: "red", note: "Even small amounts trigger symptoms" },
      { name: "Onion (all types)", zone: "red" },
      { name: "Leek (bulb)", zone: "red" },
      { name: "Wheat bread", zone: "red" },
      { name: "Pasta (wheat)", zone: "red" },
      { name: "Rye", zone: "red" },
      { name: "Barley", zone: "red" },
      { name: "Asparagus", zone: "red" },
      { name: "Watermelon", zone: "red" },
      { name: "Inulin / chicory root", zone: "red", note: "Often added to 'health' foods — check labels" },
      { name: "Long-fermented sourdough", zone: "green", note: "Fermentation degrades fructans" },
      { name: "Rice (all types)", zone: "green" },
      { name: "Oats", zone: "green" },
      { name: "Corn / polenta", zone: "green" },
      { name: "Quinoa", zone: "green" },
      { name: "Leek (green top only)", zone: "green" },
      { name: "Spring onion (green part only)", zone: "green" },
      { name: "Garlic-infused oil", zone: "green", note: "FODMAPs do not transfer to oil" },
    ],
    safeAlternatives: [
      "Garlic-infused oil",
      "Long-fermented sourdough",
      "Gluten-free pasta",
      "Rice",
      "Quinoa",
      "Spring onion (green tops)",
    ],
  },
  {
    id: "gos",
    name: "GOS",
    fodmapType: "Oligosaccharides (Galacto-oligosaccharides)",
    description:
      "Found mainly in legumes. Highly fermentable — a major cause of wind and bloating after bean-based meals.",
    mainTrigger: "Gas, bloating, distension",
    conditions: ["IBS"],
    foods: [
      { name: "Chickpeas (unrinsed)", zone: "red" },
      { name: "Kidney beans", zone: "red" },
      { name: "Baked beans", zone: "red" },
      { name: "Lentils (unrinsed)", zone: "red" },
      { name: "Soy milk (whole soybean)", zone: "red" },
      { name: "Cashews", zone: "red" },
      { name: "Pistachios", zone: "red" },
      { name: "Canned chickpeas (rinsed, ¼ cup)", zone: "yellow", portion: "¼ cup max" },
      { name: "Canned lentils (rinsed, ½ cup)", zone: "yellow", portion: "½ cup max" },
      { name: "Firm tofu", zone: "green", note: "Most GOS removed during processing" },
      { name: "Tempeh", zone: "green" },
      { name: "Mung bean sprouts", zone: "green" },
      { name: "Peanuts", zone: "green", portion: "Up to 32 g" },
      { name: "Macadamia nuts", zone: "green" },
      { name: "Walnuts", zone: "green", portion: "Up to 30 g" },
    ],
    safeAlternatives: [
      "Firm tofu",
      "Tempeh",
      "Canned lentils (rinsed, small portion)",
      "Peanuts (small portion)",
    ],
  },
  {
    id: "lactose",
    name: "Lactose",
    fodmapType: "Disaccharides",
    description:
      "Milk sugar. Only problematic when lactase enzyme output is insufficient — very common in IBS, IBD, and SIBO.",
    mainTrigger: "Diarrhoea, cramping, urgency",
    conditions: ["IBS", "IBD", "SIBO"],
    foods: [
      { name: "Cow's milk", zone: "red" },
      { name: "Goat's milk", zone: "red" },
      { name: "Regular yogurt", zone: "red" },
      { name: "Ricotta", zone: "red" },
      { name: "Cottage cheese", zone: "red" },
      { name: "Ice cream", zone: "red" },
      { name: "Custard", zone: "red" },
      { name: "Cream cheese", zone: "red" },
      { name: "Sour cream", zone: "yellow", portion: "2 tbsp max" },
      { name: "Lactose-free milk", zone: "green" },
      { name: "Lactose-free yogurt", zone: "green" },
      { name: "Almond milk (no inulin)", zone: "green", note: "Check for added chicory root/inulin" },
      { name: "Oat milk (plain)", zone: "green" },
      { name: "Aged hard cheese (cheddar, parmesan)", zone: "green", note: "Aging removes lactose" },
      { name: "Brie / camembert", zone: "green", note: "Very low lactose" },
      { name: "Butter / ghee", zone: "green" },
    ],
    safeAlternatives: [
      "Lactose-free milk & yogurt",
      "Aged hard cheeses",
      "Almond / oat milk",
      "Butter and ghee",
    ],
  },
  {
    id: "fructose",
    name: "Excess Fructose",
    fodmapType: "Monosaccharides",
    description:
      "Only problematic when fructose exceeds glucose in a food. Found in honey, mango, apples, and pears.",
    mainTrigger: "Diarrhoea, bloating, gas",
    conditions: ["IBS", "SIBO"],
    foods: [
      { name: "Honey", zone: "red" },
      { name: "Agave nectar", zone: "red" },
      { name: "Mango", zone: "red" },
      { name: "Apple", zone: "red", note: "Also high in sorbitol" },
      { name: "Pear", zone: "red", note: "Also high in sorbitol" },
      { name: "Watermelon", zone: "red" },
      { name: "Dried fruit (most)", zone: "red" },
      { name: "High-fructose corn syrup", zone: "red", note: "Check labels on drinks and sauces" },
      { name: "Ripe banana", zone: "yellow", note: "Firm/unripe is lower FODMAP" },
      { name: "Coconut water", zone: "yellow", portion: "Max 100 ml" },
      { name: "Strawberries", zone: "green" },
      { name: "Blueberries", zone: "green" },
      { name: "Raspberries", zone: "green" },
      { name: "Oranges / mandarins", zone: "green" },
      { name: "Kiwi", zone: "green" },
      { name: "Firm (unripe) banana", zone: "green" },
      { name: "Fresh pineapple", zone: "green", portion: "1 cup max" },
      { name: "Maple syrup", zone: "green", note: "Balanced glucose:fructose ratio" },
    ],
    safeAlternatives: [
      "Berries (all types)",
      "Citrus fruits",
      "Maple syrup",
      "Firm banana",
      "Kiwi",
    ],
  },
  {
    id: "sorbitol",
    name: "Sorbitol",
    fodmapType: "Polyols",
    description:
      "A sugar alcohol in stone fruits and used as an artificial sweetener (E420). Poor absorption causes osmotic diarrhoea.",
    mainTrigger: "Diarrhoea, urgency, cramping",
    conditions: ["IBS", "IBD"],
    foods: [
      { name: "Apple", zone: "red", note: "Also high in excess fructose" },
      { name: "Pear", zone: "red", note: "Also high in excess fructose" },
      { name: "Peach", zone: "red" },
      { name: "Plum", zone: "red" },
      { name: "Cherries", zone: "red" },
      { name: "Blackberries", zone: "red" },
      { name: "Nectarine", zone: "red" },
      { name: "Prunes / dried plums", zone: "red" },
      { name: "Apricot", zone: "red" },
      { name: "Sugar-free gum / mints", zone: "red", note: "Check label for sorbitol (E420)" },
      { name: "Avocado", zone: "yellow", portion: "⅛ of an avocado max" },
      { name: "Strawberries", zone: "green" },
      { name: "Raspberries", zone: "green" },
      { name: "Kiwi", zone: "green" },
      { name: "Orange / mandarin", zone: "green" },
      { name: "Banana", zone: "green" },
      { name: "Lemon / lime", zone: "green" },
      { name: "Papaya", zone: "green" },
    ],
    safeAlternatives: [
      "Berries",
      "Citrus fruits",
      "Kiwi",
      "Banana",
      "Papaya",
    ],
  },
  {
    id: "mannitol",
    name: "Mannitol",
    fodmapType: "Polyols",
    description:
      "Another sugar alcohol found in mushrooms, cauliflower, and celery. Also used as an artificial sweetener (E421).",
    mainTrigger: "Bloating, gas, abdominal pain",
    conditions: ["IBS"],
    foods: [
      { name: "Mushrooms (all varieties)", zone: "red" },
      { name: "Cauliflower", zone: "red" },
      { name: "Celery (large amounts)", zone: "red" },
      { name: "Sweet potato (large serve)", zone: "red", note: "70 g or less is green" },
      { name: "Watermelon", zone: "red" },
      { name: "Snow peas", zone: "red" },
      { name: "Butternut squash", zone: "yellow", portion: "¼ cup max" },
      { name: "Turnip", zone: "yellow" },
      { name: "Broccoli", zone: "green", portion: "¾ cup max — larger serves increase mannitol" },
      { name: "Carrot", zone: "green" },
      { name: "Zucchini", zone: "green" },
      { name: "Cucumber", zone: "green" },
      { name: "Capsicum / bell pepper", zone: "green" },
      { name: "Kale / spinach", zone: "green" },
      { name: "Lettuce / rocket", zone: "green" },
      { name: "Green beans", zone: "green" },
      { name: "Sweet potato (70 g)", zone: "green", portion: "70 g only" },
      { name: "Potato (plain)", zone: "green" },
      { name: "Eggplant", zone: "green" },
    ],
    safeAlternatives: [
      "Broccoli (small portion)",
      "Zucchini",
      "Carrot",
      "Capsicum",
      "Kale and spinach",
    ],
  },
];

export type ReintroStatus = "tolerated" | "partial" | "trigger" | "untested";

export interface ReintroductionChallenge {
  id: string;
  categoryId: string;
  name: string;
  testFood: string;
  testAmount: string;
  protocol: string;
  watchFor: string[];
}

export const REINTRODUCTION_CHALLENGES: ReintroductionChallenge[] = [
  {
    id: "r_lactose",
    categoryId: "lactose",
    name: "Lactose",
    testFood: "Regular full-fat milk",
    testAmount: "200 ml (1 glass)",
    protocol:
      "Day 1: 100 ml · Day 2: 200 ml · Day 3: 300 ml. Eat with food. Allow 3 days symptom-free washout before the next challenge.",
    watchFor: ["Diarrhoea", "Urgency", "Cramping within 2–4 hours"],
  },
  {
    id: "r_fructose",
    categoryId: "fructose",
    name: "Excess Fructose",
    testFood: "Honey",
    testAmount: "2 tsp",
    protocol:
      "Test honey on an empty stomach in the morning. Record all symptoms for 24 hours. Honey is a single-FODMAP challenge food (pure excess fructose).",
    watchFor: ["Diarrhoea", "Bloating", "Gas within 2–6 hours"],
  },
  {
    id: "r_sorbitol",
    categoryId: "sorbitol",
    name: "Sorbitol",
    testFood: "Blackberries",
    testAmount: "1 cup (fresh)",
    protocol:
      "Blackberries are the single-FODMAP sorbitol test food. Eat with a low-FODMAP meal. Allow 3 days washout before the next challenge.",
    watchFor: ["Diarrhoea", "Urgency", "Cramping"],
  },
  {
    id: "r_mannitol",
    categoryId: "mannitol",
    name: "Mannitol",
    testFood: "Button mushrooms (cooked)",
    testAmount: "¾ cup",
    protocol:
      "Cook mushrooms before eating. Mushrooms are the cleanest single-FODMAP test food for mannitol. Record symptoms for 24 hours.",
    watchFor: ["Bloating", "Gas", "Abdominal pain within 4–8 hours"],
  },
  {
    id: "r_gos",
    categoryId: "gos",
    name: "GOS (Legumes)",
    testFood: "Canned chickpeas (rinsed)",
    testAmount: "½ cup",
    protocol:
      "Rinse canned chickpeas thoroughly before testing. GOS ferments slowly — symptoms may be delayed 6–8 hours. Allow 3 days washout.",
    watchFor: ["Gas", "Bloating", "Distension within 4–8 hours"],
  },
  {
    id: "r_fructans_wheat",
    categoryId: "fructans",
    name: "Fructans — Wheat",
    testFood: "Regular wheat bread (not sourdough)",
    testAmount: "2 slices",
    protocol:
      "Test wheat before garlic/onion. Do NOT test if you have confirmed coeliac disease. Note: wheat intolerance ≠ gluten intolerance.",
    watchFor: ["Bloating", "Gas", "Abdominal pain", "Altered stool"],
  },
  {
    id: "r_fructans_garlic",
    categoryId: "fructans",
    name: "Fructans — Garlic",
    testFood: "Fresh garlic cloves",
    testAmount: "1–2 cloves",
    protocol:
      "Use fresh garlic only (not powder or garlic-infused oil). Test separately from onion. Even small amounts may trigger symptoms in sensitive individuals.",
    watchFor: ["Bloating", "Gas", "Cramping within 2–6 hours"],
  },
  {
    id: "r_fructans_onion",
    categoryId: "fructans",
    name: "Fructans — Onion",
    testFood: "Brown onion (cooked)",
    testAmount: "½ medium onion",
    protocol:
      "Test cooked onion first — slightly lower FODMAP than raw. Test separately from garlic results so reactions can be attributed correctly.",
    watchFor: ["Bloating", "Gas", "Cramping within 2–6 hours"],
  },
];

// ─── Lab data ────────────────────────────────────────────────────────────────

export type LabPanel = "inflammation" | "nutrients" | "sibo" | "microbiome";

export interface LabMarker {
  id: string;
  name: string;
  unit: string;
  panel: LabPanel;
  normalLow: number;
  normalHigh: number;
  criticalLow?: number;
  criticalHigh?: number;
  borderlineHighStart?: number; // value where borderline_high begins
  interpreterations: {
    critical_low?: string;
    low?: string;
    borderline_low?: string;
    normal: string;
    borderline_high?: string;
    high?: string;
    critical_high?: string;
  };
  giNote: string;
}

export const LAB_MARKERS: LabMarker[] = [
  // ── Inflammation ──────────────────────────────────────────────────────────
  {
    id: "calprotectin",
    name: "Fecal Calprotectin",
    unit: "µg/g",
    panel: "inflammation",
    normalLow: 0,
    normalHigh: 50,
    borderlineHighStart: 50,
    criticalHigh: 600,
    interpreterations: {
      normal: "Normal (<50 µg/g) — mucosal inflammation unlikely. Supports IBS over IBD.",
      borderline_high:
        "Borderline (50–200): Retest in 4–6 weeks. May reflect NSAID use, infection, or mild IBD activity.",
      high: "Elevated (>200): Significant GI inflammation likely. Consider endoscopy to exclude IBD.",
      critical_high:
        "Very elevated (>600): Consistent with active IBD. Urgent review recommended.",
    },
    giNote:
      "Best single marker for distinguishing IBS from IBD. Not elevated in IBS alone. Widely used for IBD monitoring.",
  },
  {
    id: "crp",
    name: "C-Reactive Protein (CRP)",
    unit: "mg/L",
    panel: "inflammation",
    normalLow: 0,
    normalHigh: 5,
    borderlineHighStart: 5,
    criticalHigh: 50,
    interpreterations: {
      normal: "Normal (<5 mg/L) — no significant systemic inflammation.",
      borderline_high:
        "Mildly elevated (5–10): Non-specific. Can reflect mild infection, stress, or low-grade IBD activity.",
      high: "Elevated (>10): Significant inflammation. Crohn's typically raises CRP more than UC.",
      critical_high: "Markedly elevated (>50): Active severe inflammation. Urgent clinical review.",
    },
    giNote:
      "Less specific than calprotectin for mucosal IBD. May be normal in mild-moderate UC. Use alongside calprotectin for full picture.",
  },
  {
    id: "esr",
    name: "ESR",
    unit: "mm/hr",
    panel: "inflammation",
    normalLow: 0,
    normalHigh: 20,
    borderlineHighStart: 20,
    criticalHigh: 100,
    interpreterations: {
      normal: "Normal (<20 mm/hr) — no significant inflammatory activity.",
      borderline_high:
        "Mildly elevated: Non-specific. Common in mild anaemia, pregnancy, and ageing.",
      high: "Elevated: Active inflammation. Use alongside CRP for IBD activity assessment.",
      critical_high: "Markedly elevated: Active severe disease. Combined with other markers.",
    },
    giNote:
      "Non-specific but useful combined with CRP for IBD disease activity scoring (Harvey-Bradshaw, CDAI).",
  },
  {
    id: "albumin",
    name: "Albumin",
    unit: "g/L",
    panel: "inflammation",
    normalLow: 35,
    normalHigh: 50,
    criticalLow: 28,
    interpreterations: {
      critical_low:
        "Critically low (<28 g/L): Severe protein depletion or protein-losing enteropathy. Urgent nutritional support.",
      low: "<35 g/L: Indicates protein malnutrition, malabsorption, or active inflammation. Common in active Crohn's or UC.",
      normal: "35–50 g/L: Normal — adequate nutritional status.",
    },
    giNote:
      "Falls with active IBD and protein-losing enteropathy. Key nutritional marker; important for treatment decisions in Crohn's and UC.",
  },
  // ── Nutrients ─────────────────────────────────────────────────────────────
  {
    id: "b12",
    name: "Vitamin B12",
    unit: "pg/mL",
    panel: "nutrients",
    normalLow: 200,
    normalHigh: 900,
    criticalLow: 150,
    interpreterations: {
      critical_low:
        "Critically low (<150): High risk of neuropathy and megaloblastic anaemia. Immediate B12 replacement.",
      low: "<200: Deficient. Supplementation required — oral high-dose or IM injection depending on cause.",
      normal:
        "200–900: Normal. Note: functional deficiency can exist in the 200–300 range — check MMA/homocysteine if symptomatic.",
    },
    giNote:
      "Absorbed exclusively in the terminal ileum — severely at risk in ileal Crohn's disease and post-ileal resection. Also depleted by SIBO (bacterial consumption). Check annually in IBD.",
  },
  {
    id: "folate",
    name: "Folate (Serum)",
    unit: "ng/mL",
    panel: "nutrients",
    normalLow: 2.7,
    normalHigh: 17,
    criticalLow: 1.5,
    interpreterations: {
      critical_low: "Critically low (<1.5): Megaloblastic anaemia risk. Immediate supplementation.",
      low: "<2.7: Deficient. Supplementation required. Causes megaloblastic anaemia similar to B12.",
      normal: "2.7–17: Normal.",
    },
    giNote:
      "Low in active IBD due to malabsorption. Mandatory supplementation when methotrexate is used (methotrexate depletes folate as part of its mechanism).",
  },
  {
    id: "ferritin",
    name: "Ferritin",
    unit: "ng/mL",
    panel: "nutrients",
    normalLow: 15,
    normalHigh: 300,
    criticalLow: 7,
    borderlineHighStart: 300,
    interpreterations: {
      critical_low:
        "Critically low (<7): Severe iron depletion. IV iron therapy typically required.",
      low: "<15: Iron-deficient. Most common nutritional deficiency in IBD. IV iron if oral poorly tolerated.",
      normal:
        "15–300: Normal. Note: ferritin is an acute-phase reactant — may be falsely elevated during active inflammation.",
      borderline_high:
        ">300 with elevated CRP: May be falsely elevated due to inflammation rather than true iron excess.",
    },
    giNote:
      "Chronic GI blood loss in IBD frequently causes iron-deficiency anaemia. Always check CRP alongside ferritin — active inflammation falsely raises ferritin, masking true iron status.",
  },
  {
    id: "vitd",
    name: "Vitamin D (25-OH)",
    unit: "nmol/L",
    panel: "nutrients",
    normalLow: 50,
    normalHigh: 150,
    criticalLow: 25,
    borderlineHighStart: 150,
    interpreterations: {
      critical_low:
        "Severely deficient (<25 nmol/L): High-dose supplementation needed. Associated with increased IBD flare risk.",
      low: "<50: Deficient. Aggressive supplementation recommended — a common finding in >50% of IBD patients.",
      borderline_low:
        "30–50: Insufficient. Supplement to achieve optimal levels (50–150 nmol/L).",
      normal: "50–150: Optimal range.",
      borderline_high: ">150: May indicate over-supplementation. Review dose.",
    },
    giNote:
      "Vitamin D deficiency is the single most common nutritional deficiency in IBD and correlates with disease activity. Critical for immune regulation and mucosal healing.",
  },
  {
    id: "zinc",
    name: "Zinc",
    unit: "µmol/L",
    panel: "nutrients",
    normalLow: 10.7,
    normalHigh: 22.9,
    criticalLow: 7,
    interpreterations: {
      critical_low: "Severely low: Immune dysfunction and impaired mucosal healing. Urgent supplementation.",
      low: "<10.7: Deficient — associated with impaired wound healing and diarrhoea. Common in Crohn's.",
      normal: "10.7–22.9: Normal.",
    },
    giNote:
      "Absorbed in the jejunum; lost in diarrhoea and high ostomy output. Essential for mucosal barrier integrity and immune function.",
  },
];

export const SIBO_TIME_POINTS = [0, 20, 40, 60, 90, 120] as const;

export interface SIBOResult {
  h2Positive: boolean;
  ch4Positive: boolean;
  pattern: string;
  interpretation: string;
  detail: string;
}

export function interpretSIBO(h2: number[], ch4: number[]): SIBOResult | null {
  if (h2.length < 6 || ch4.length < 6) return null;

  const baseline_h2 = h2[0];
  const max_h2_rise = Math.max(...h2.slice(1).map((v) => v - baseline_h2));
  const max_ch4 = Math.max(...ch4);
  const early_rise = h2.slice(1, 4).some((v) => v - baseline_h2 >= 20);

  const h2_pos = max_h2_rise >= 20 || baseline_h2 > 20;
  const ch4_pos = max_ch4 >= 10;

  if (!h2_pos && !ch4_pos) {
    return {
      h2Positive: false,
      ch4Positive: false,
      pattern: "Negative",
      interpretation: "SIBO unlikely by standard breath test criteria.",
      detail:
        "No significant hydrogen or methane rise detected. If symptoms persist, consider hydrogen sulfide SIBO (requires specialised testing — neither H₂ nor CH₄ rises but H₂S is produced).",
    };
  }

  if (h2_pos && ch4_pos) {
    return {
      h2Positive: true,
      ch4Positive: true,
      pattern: "Positive — Mixed H₂ + CH₄",
      interpretation: "Mixed-type SIBO (hydrogen-producing bacteria + methanogens).",
      detail:
        "Both hydrogen and methane are elevated. Treatment typically requires rifaximin combined with a second antibiotic active against methanogens (e.g. neomycin or metronidazole).",
    };
  }

  if (h2_pos) {
    return {
      h2Positive: true,
      ch4Positive: false,
      pattern: early_rise ? "Positive — H₂ SIBO (Early/Proximal)" : "Positive — H₂ SIBO (Late rise)",
      interpretation: early_rise
        ? "Hydrogen rise within first 60 min — consistent with proximal small intestinal bacterial overgrowth."
        : "Hydrogen rise after 60 min — may represent distal SIBO or normal colonic fermentation. Clinical correlation important.",
      detail: early_rise
        ? "Proximal SIBO pattern. Rifaximin is first-line for non-constipation-predominant SIBO."
        : "Late-rise H₂ is less specific. Interpret alongside symptoms and other markers.",
    };
  }

  return {
    h2Positive: false,
    ch4Positive: true,
    pattern: "Positive — IMO (Intestinal Methanogen Overgrowth)",
    interpretation: "Methane-dominant pattern. Associated with constipation-predominant IBS.",
    detail:
      "Methanogenic archaea overgrowth. Rifaximin monotherapy is less effective — rifaximin + neomycin (or metronidazole) is the recommended protocol. Consider also low-fermentation diet.",
  };
}
