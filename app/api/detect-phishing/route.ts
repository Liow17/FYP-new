import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const DETECTION_PROMPT = `You are a cybersecurity expert analyzing potential phishing attempts.

Analyze the provided email content or URL and determine if it's likely to be phishing.

Consider the following indicators:
- Sender email address authenticity
- URL domain legitimacy
- Urgency or threatening language
- Grammar and spelling errors
- Requests for sensitive information
- Suspicious links or attachments
- Generic greetings
- Mismatched URLs (display text vs actual link)
- Domain typosquatting

Provide your analysis in the following JSON format:
{
  "isPhishing": true or false,
  "confidence": "high" | "medium" | "low",
  "riskLevel": "critical" | "high" | "medium" | "low" | "safe",
  "redFlags": ["list", "of", "specific", "red", "flags", "found"],
  "analysis": "Detailed explanation of your findings and why you classified it this way",
  "recommendation": "Clear actionable advice for the user"
}

Be thorough and educational in your analysis.
Respond ONLY with valid JSON, no additional text.`;

interface DetectionRequest {
  content: string;
  type: "email" | "url";
}

export async function POST(req: NextRequest) {
  try {
    const { content, type }: DetectionRequest = await req.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: "Content and type are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const typeDescription = type === "email" ? "email content" : "URL";
    const fullPrompt = `${DETECTION_PROMPT}\n\nAnalyze this ${typeDescription}:\n\n${content}`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate the analysis structure
    if (
      analysis.isPhishing === undefined ||
      !analysis.confidence ||
      !analysis.riskLevel ||
      !analysis.analysis ||
      !analysis.recommendation
    ) {
      throw new Error("Incomplete analysis data");
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error detecting phishing:", error);

    let errorMessage = "Failed to analyze content";
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
