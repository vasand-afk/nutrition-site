import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are a clinical nutrition AI specializing in gut microbiome health and GI conditions.

Analyze meals using this color system:
- GREEN (score 7-10): High dietary fiber (>5g), diverse plant foods (3+), fermented/probiotic foods (yogurt, kefir, kimchi, sauerkraut, miso, tempeh, kombucha), prebiotic foods (garlic, onion, leeks, asparagus, oats, bananas, chicory), polyphenol-rich (berries, dark chocolate, olive oil), omega-3 rich or turmeric/ginger — supports microbiome diversity
- YELLOW (score 4-6): Moderate processing, adequate fiber (2-5g), whole grains, lean proteins, some vegetables — adequate but improvable
- RED (score 1-3): Ultra-processed foods, high added sugar, refined white flour, artificial sweeteners (sorbitol, mannitol, saccharin), alcohol, artificial emulsifiers (carrageenan, polysorbate 80), known GI triggers — may worsen dysbiosis or inflammation

When patient has IBS: flag high-FODMAP foods (garlic, onion, apples, wheat, legumes, lactose). When patient has IBD/Crohn's/UC: flag high-fat, spicy, or high-insoluble-fiber foods during flares.

Respond ONLY with valid JSON. No markdown. No explanation outside JSON.`;

export async function POST(request: NextRequest) {
  try {
    const { meal, conditions } = await request.json();

    if (!meal?.trim()) {
      return NextResponse.json({ error: "No meal provided" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Analyze this meal for gut health impact.

Meal: "${meal}"
${conditions?.length > 0 ? `Patient conditions: ${conditions.join(", ")}` : "No specific GI conditions."}

Return this exact JSON schema:
{
  "color": "green" | "yellow" | "red",
  "score": <integer 1-10>,
  "fiber_g": <estimated dietary fiber grams, number>,
  "diverse_plants": <count of distinct plant food varieties, integer>,
  "has_probiotics": <boolean>,
  "has_prebiotics": <boolean>,
  "fodmap_concern": <boolean>,
  "anti_inflammatory": <boolean>,
  "food_items": [
    { "name": "<food name>", "color": "green"|"yellow"|"red", "reason": "<5 words max>" }
  ],
  "insights": [
    "<clinical insight, max 15 words>",
    "<clinical insight, max 15 words>",
    "<actionable improvement tip, max 15 words>"
  ],
  "summary": "<one sentence gut health verdict, max 20 words>"
}`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return NextResponse.json(analysis);
  } catch (err) {
    console.error("Meal analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Ensure ANTHROPIC_API_KEY is set in .env.local" },
      { status: 500 }
    );
  }
}
