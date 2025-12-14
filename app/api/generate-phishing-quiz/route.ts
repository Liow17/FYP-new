import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const QUIZ_PROMPT = `You are a cybersecurity education tool that generates phishing awareness quiz questions.

Generate 10 multiple-choice questions about phishing awareness and email security. Each question should:
1. Test knowledge of phishing concepts, detection techniques, or prevention strategies
2. Have 4 answer options
3. Have exactly one correct answer
4. Include an educational explanation for why the answer is correct

Topics to cover (choose randomly):
- What is phishing and its variations (spear phishing, smishing, vishing, whaling)
- Warning signs of phishing emails (urgent language, suspicious links, sender address, etc.)
- How to verify suspicious communications
- URL and domain verification techniques
- Social engineering tactics
- Email authentication and security
- Reporting and responding to phishing attempts
- Multi-factor authentication benefits
- Safe browsing practices
- Real-world phishing examples and scenarios

Format your response as valid JSON:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct and what users should learn from this question."
    },
    ...
  ]
}

Make the questions varied in difficulty and practical. Include realistic scenarios when possible.
Respond ONLY with valid JSON, no additional text.`;

export async function POST(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(QUIZ_PROMPT);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response (sometimes the model wraps it in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const quizData = JSON.parse(jsonMatch[0]);

    // Validate the quiz structure
    if (!quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length !== 10) {
      throw new Error("Invalid quiz data generated");
    }

    // Validate each question
    for (const q of quizData.questions) {
      if (!q.question || !q.options || q.options.length !== 4 || q.correctAnswer === undefined || !q.explanation) {
        throw new Error("Incomplete question data");
      }
    }

    return NextResponse.json({ questions: quizData.questions });
  } catch (error) {
    console.error("Error generating phishing quiz:", error);

    let errorMessage = "Failed to generate quiz";
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
