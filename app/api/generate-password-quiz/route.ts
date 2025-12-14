import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const QUIZ_PROMPT = `You are a cybersecurity education tool that generates password security quiz questions.

Generate 10 multiple-choice questions about password security. Each question should:
1. Test knowledge of password security concepts, best practices, or common mistakes
2. Have 4 answer options
3. Have exactly one correct answer
4. Include an educational explanation for why the answer is correct

Topics to cover (choose randomly):
- Password length and complexity requirements
- Password reuse risks
- Password managers
- Two-factor authentication (2FA/MFA)
- Common password attacks (brute force, dictionary attacks, etc.)
- Password storage best practices
- Password change policies
- Passphrases vs passwords
- Personal information in passwords
- Password strength indicators

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

Make the questions varied in difficulty and engaging. Use real-world scenarios when possible.
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
    console.error("Error generating password quiz:", error);

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
