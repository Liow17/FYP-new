import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const TUTOR_PROMPT = `You are an expert cybersecurity tutor providing personalized feedback on phishing detection exercises.

Your role is to:
1. Analyze the user's answer and the correct answer
2. Provide encouraging, educational feedback
3. Explain why the correct answer is right
4. If the user was wrong, gently explain their mistake
5. Offer tips to improve their phishing detection skills
6. Keep responses concise (2-4 sentences) but insightful

Be supportive, patient, and focus on learning outcomes. Use a friendly, encouraging tone.`;

interface TutorRequest {
  scenario: {
    from: string;
    subject: string;
    body: string;
    type: string;
    redFlags?: string[];
  };
  userAnswer: string;
  correctAnswer: string;
  context?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { scenario, userAnswer, correctAnswer, context }: TutorRequest = await req.json();

    if (!scenario || !userAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    const analysisPrompt = `${TUTOR_PROMPT}

Scenario:
- From: ${scenario.from}
- Subject: ${scenario.subject}
- Type: ${scenario.type}
${scenario.redFlags ? `- Red Flags: ${scenario.redFlags.join(", ")}` : ""}

User's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
Result: ${isCorrect ? "CORRECT" : "INCORRECT"}

${context ? `Additional Context: ${context}` : ""}

Provide personalized feedback for this student. If they were correct, reinforce their good judgment and highlight what they did well. If incorrect, gently explain why and help them learn to spot similar threats.

Keep your response to 2-4 sentences, friendly and encouraging.`;

    const result = await model.generateContent(analysisPrompt);
    const response = result.response;
    const feedback = response.text();

    return NextResponse.json({
      feedback,
      isCorrect,
    });
  } catch (error) {
    console.error("Error in AI tutor:", error);

    let errorMessage = "Failed to get feedback";
    if (error instanceof Error) {
      if (error.message.includes("fetch failed")) {
        errorMessage = "Unable to connect to AI tutor service. Please check your network connection.";
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
