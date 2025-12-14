import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const LOGIN_PROMPT = `You are a cybersecurity education tool that generates login page scenarios for phishing awareness training.

Generate a realistic login page scenario that can be either phishing or legitimate. The scenario should help users learn to identify fake login pages.

Consider indicators like:
- HTTPS vs HTTP
- Domain authenticity (e.g., facebook.com vs facebook.com.verify-account.net)
- Suspicious subdomains
- Correct company domains
- URL tricks (putting legitimate-looking text before the actual domain)

Format your response as valid JSON:
{
  "siteName": "the name of the website (e.g., 'PayPal', 'Facebook', 'Apple ID')",
  "url": "the URL of the login page",
  "hasHttps": true or false,
  "hasSuspiciousDomain": true or false,
  "isPhishing": true or false,
  "explanation": "Detailed explanation of why this is phishing or legitimate, mentioning specific indicators like HTTPS, domain name, etc."
}

Make it educational and realistic. Vary between phishing and legitimate login pages.
Respond ONLY with valid JSON, no additional text.`;

export async function POST(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(LOGIN_PROMPT);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const scenario = JSON.parse(jsonMatch[0]);

    // Validate the scenario structure
    if (
      !scenario.siteName ||
      !scenario.url ||
      scenario.hasHttps === undefined ||
      scenario.hasSuspiciousDomain === undefined ||
      scenario.isPhishing === undefined ||
      !scenario.explanation
    ) {
      throw new Error("Incomplete scenario data");
    }

    return NextResponse.json({ scenario });
  } catch (error) {
    console.error("Error generating login scenario:", error);

    let errorMessage = "Failed to generate login scenario";
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
