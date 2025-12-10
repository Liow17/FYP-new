import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { fetch as undiciFetch } from "undici";

// Use undici's fetch for better compatibility
global.fetch = undiciFetch as any;

// Validate API key exists
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const SYSTEM_PROMPT = `You are a helpful cybersecurity education assistant specializing in phishing awareness and password security. Your role is to:

1. Answer questions about phishing attacks, how to identify them, and how to protect against them
2. Provide guidance on password security best practices
3. Explain cybersecurity concepts in simple, easy-to-understand language
4. Give practical, actionable advice for staying safe online
5. Be encouraging and supportive while educating users

Keep your responses concise, friendly, and educational. Focus on practical tips and real-world examples. If asked about topics outside of phishing and password security, politely redirect the conversation back to these core topics.`;

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set GEMINI_API_KEY in .env.local file." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Build chat history
    const chatHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })) || [];

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm here to help users learn about phishing awareness and password security. I'll provide clear, practical, and encouraging guidance on these topics." }],
        },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error in chat API:", error);

    // Provide more detailed error messages
    let errorMessage = "Failed to process request";
    if (error instanceof Error) {
      if (error.message.includes("fetch failed")) {
        errorMessage = "Unable to connect to AI service. Please check your network connection and try again.";
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
