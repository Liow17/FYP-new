import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SCENARIO_PROMPT = `You are a cybersecurity education tool that generates realistic phishing email scenarios for training purposes.

Generate a realistic phishing email scenario with the following structure:

1. **Email Metadata:**
   - From (sender email - should be suspicious)
   - Subject (urgent/enticing)
   - Type (e.g., "Phishing", "Legitimate" - mostly phishing but occasionally legitimate for variety)

2. **Email Body:**
   - Write a complete email body that mimics real phishing attempts
   - Include typical phishing tactics (urgency, threats, too-good-to-be-true offers, fake links, etc.)
   - Make it realistic but educational

3. **Red Flags (list 4-6 warning signs):**
   - Identify specific red flags in the email
   - These should be concrete observations (e.g., "Sender address uses free email service", "URL doesn't match company domain")

4. **Explanation:**
   - Brief explanation of why this is or isn't phishing
   - Educational tips for spotting similar attempts

Format your response as valid JSON:
{
  "from": "sender@example.com",
  "subject": "Email subject",
  "type": "Phishing" or "Legitimate",
  "body": "Full email body text...",
  "redFlags": ["flag 1", "flag 2", "flag 3", "flag 4"],
  "explanation": "Educational explanation..."
}

Generate a NEW unique scenario each time. Vary the type of attack (e.g., bank, tech support, shipping, social media, tax, prize/lottery, etc.).`;

interface ScenarioRequest {
  difficulty?: "easy" | "medium" | "hard";
}

export async function POST(req: NextRequest) {
  try {
    const body: ScenarioRequest = await req.json().catch(() => ({}));
    const difficulty = body.difficulty || "medium";

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const difficultyInstructions: Record<string, string> = {
      easy: "Make the phishing indicators very obvious (e.g., poor grammar, obvious fake email addresses, suspicious links).",
      medium: "Make the phishing indicators moderately subtle but still detectable with careful inspection.",
      hard: "Make the phishing indicators quite subtle, mimicking sophisticated spear-phishing attempts.",
    };

    const fullPrompt = `${SCENARIO_PROMPT}\n\nDifficulty level: ${difficulty.toUpperCase()}\n${difficultyInstructions[difficulty]}\n\nRespond ONLY with valid JSON, no additional text.`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response (sometimes the model wraps it in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const scenario = JSON.parse(jsonMatch[0]);

    // Validate the scenario structure
    if (!scenario.from || !scenario.subject || !scenario.body || !scenario.type) {
      throw new Error("Incomplete scenario generated");
    }

    return NextResponse.json({ scenario });
  } catch (error) {
    console.error("Error generating scenario:", error);

    let errorMessage = "Failed to generate scenario";
    if (error instanceof Error) {
      if (error.message.includes("fetch failed")) {
        errorMessage = "Unable to connect to AI service. Please check your network connection.";
      } else if (error.message.includes("API key")) {
        errorMessage = "API configuration error. Please contact support.";
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
