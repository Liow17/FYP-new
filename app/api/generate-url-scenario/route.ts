import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const URL_PROMPT = `You are a cybersecurity education tool that generates URL scenarios for phishing awareness training.

Generate a realistic URL scenario that can be either phishing or legitimate. The scenario should help users learn to identify suspicious URLs.

Include variations like:
- Typosquatting (g00gle.com, paypa1.com)
- Suspicious subdomains (secure-netflix-billing.com)
- Wrong top-level domains (.ru, .xyz instead of .com)
- URL with HTTP vs HTTPS
- Legitimate URLs from major companies

Format your response as valid JSON:
{
  "url": "the actual URL",
  "displayText": "what the link appears as (e.g., 'Google Sign In')",
  "isPhishing": true or false,
  "explanation": "Detailed explanation of why this is phishing or legitimate, including specific indicators to look for"
}

Make it educational and realistic. Vary between phishing and legitimate URLs.
Respond ONLY with valid JSON, no additional text.`;

export async function POST(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(URL_PROMPT);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const scenario = JSON.parse(jsonMatch[0]);

    // Validate the scenario structure
    if (!scenario.url || !scenario.displayText || scenario.isPhishing === undefined || !scenario.explanation) {
      throw new Error("Incomplete scenario data");
    }

    return NextResponse.json({ scenario });
  } catch (error) {
    console.error("Error generating URL scenario:", error);

    let errorMessage = "Failed to generate URL scenario";
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
