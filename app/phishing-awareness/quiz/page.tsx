"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is phishing?",
    options: [
      "A type of computer virus",
      "A cyberattack that tricks people into revealing sensitive information",
      "A legitimate email marketing technique",
      "A way to catch fish using technology"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cyberattack where criminals impersonate trusted entities to deceive victims into sharing passwords, credit card numbers, or other sensitive data."
  },
  {
    id: 2,
    question: "Which of the following is a common sign of a phishing email?",
    options: [
      "Personalized greeting with your full name",
      "Official company logo and branding",
      "Urgent language demanding immediate action",
      "Clear contact information"
    ],
    correctAnswer: 2,
    explanation: "Phishing emails often use urgent or threatening language to create panic and pressure victims into acting without thinking critically. This is a major red flag."
  },
  {
    id: 3,
    question: "You receive an email from 'support@paypa1.com' asking you to verify your account. What should you do?",
    options: [
      "Click the link immediately to secure your account",
      "Reply with your account information",
      "Recognize it as likely phishing (notice 'paypa1' instead of 'paypal') and delete it",
      "Forward it to all your contacts to warn them"
    ],
    correctAnswer: 2,
    explanation: "The misspelled domain ('paypa1' with a number 1 instead of the letter 'l') is a classic phishing technique. Never click links in suspicious emails. Go directly to the official website by typing the URL yourself."
  },
  {
    id: 4,
    question: "Which type of phishing specifically targets individuals or organizations with personalized attacks?",
    options: [
      "Whale phishing",
      "Spear phishing",
      "Clone phishing",
      "Blast phishing"
    ],
    correctAnswer: 1,
    explanation: "Spear phishing involves targeted attacks where criminals research specific victims and craft personalized messages to appear more legitimate and increase success rates."
  },
  {
    id: 5,
    question: "What should you check before clicking a link in an email?",
    options: [
      "The email subject line",
      "The sender's profile picture",
      "The actual URL by hovering over the link",
      "The email's font and colors"
    ],
    correctAnswer: 2,
    explanation: "Always hover over links (without clicking) to see the actual destination URL. Phishing emails often display legitimate-looking text but link to fraudulent websites."
  },
  {
    id: 6,
    question: "A text message claims your package is undeliverable and includes a link to update your address. What is this called?",
    options: [
      "Smishing (SMS phishing)",
      "Vishing (Voice phishing)",
      "Whaling",
      "Pharming"
    ],
    correctAnswer: 0,
    explanation: "Smishing is phishing conducted through SMS text messages. These often impersonate delivery services, banks, or government agencies to trick victims into clicking malicious links."
  },
  {
    id: 7,
    question: "Why should you be suspicious of emails with generic greetings like 'Dear Customer'?",
    options: [
      "It's rude and unprofessional",
      "Companies always use first names in emails",
      "It suggests a mass-sent email that may be fraudulent",
      "Generic greetings are always phishing"
    ],
    correctAnswer: 2,
    explanation: "While not definitive proof of phishing, generic greetings often indicate mass-sent fraudulent emails. Legitimate companies typically use your actual name from their customer database."
  },
  {
    id: 8,
    question: "What is the BEST action if you receive a suspicious email claiming to be from your bank?",
    options: [
      "Click the link to check if it's real",
      "Reply asking if the email is legitimate",
      "Contact your bank directly using the phone number on their official website",
      "Ignore it completely without reporting"
    ],
    correctAnswer: 2,
    explanation: "Never use contact information from suspicious emails. Instead, independently verify by contacting the organization through official channels you find yourself (website, phone book, official app)."
  },
  {
    id: 9,
    question: "Which of these makes you LESS vulnerable to phishing attacks?",
    options: [
      "Using the same password for all accounts",
      "Enabling two-factor authentication (2FA)",
      "Opening all email attachments to see what they are",
      "Clicking links to verify your identity quickly"
    ],
    correctAnswer: 1,
    explanation: "Two-factor authentication adds an extra security layer. Even if phishing steals your password, attackers still can't access your account without the second factor (like a code sent to your phone)."
  },
  {
    id: 10,
    question: "An email offers you a free iPhone if you click a link and enter your personal information. What is this likely to be?",
    options: [
      "A legitimate promotion",
      "A customer loyalty reward",
      "A phishing scam using too-good-to-be-true bait",
      "A marketing survey"
    ],
    correctAnswer: 2,
    explanation: "If an offer seems too good to be true, it probably is. Free expensive items are classic phishing bait designed to entice victims into clicking malicious links or sharing personal information."
  }
];

export default function PhishingQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = submitted ? calculateScore() : 0;
  const percentage = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Link href="/phishing-awareness" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to Phishing Awareness
        </Link>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Phishing Awareness Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test your ability to recognize and prevent phishing attacks
          </p>
        </header>

        {submitted && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className={`rounded-lg shadow-lg p-8 ${
              percentage >= 70 ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500" : "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500"
            }`}>
              <h2 className="text-3xl font-bold text-center mb-4">
                Your Score: {score}/{questions.length} ({percentage}%)
              </h2>
              <p className="text-center text-lg mb-4">
                {percentage >= 90 ? "Excellent! You're well-prepared to spot phishing attempts." :
                 percentage >= 70 ? "Good job! Review the explanations to further strengthen your defenses." :
                 "Keep learning! Understanding these concepts will help protect you from attacks."}
              </p>
              <div className="text-center">
                <button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Retry Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-6">
          {questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = submitted && answers[q.id] === q.correctAnswer;
            const isIncorrect = submitted && answers[q.id] !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${
                  submitted ? (isCorrect ? "border-2 border-green-500" : "border-2 border-red-500") : ""
                }`}
              >
                <div className="flex items-start mb-4">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400 mr-3">
                    {index + 1}.
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex-1">
                    {q.question}
                  </h3>
                </div>

                <div className="space-y-3 ml-8">
                  {q.options.map((option, optionIndex) => {
                    const isSelected = answers[q.id] === optionIndex;
                    const isCorrectOption = optionIndex === q.correctAnswer;

                    let optionClasses = "w-full text-left p-4 rounded-lg border-2 transition-colors ";

                    if (!submitted) {
                      optionClasses += isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700";
                    } else {
                      if (isCorrectOption) {
                        optionClasses += "border-green-500 bg-green-50 dark:bg-green-900/20";
                      } else if (isSelected && !isCorrectOption) {
                        optionClasses += "border-red-500 bg-red-50 dark:bg-red-900/20";
                      } else {
                        optionClasses += "border-gray-200 dark:border-gray-600";
                      }
                    }

                    return (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswerSelect(q.id, optionIndex)}
                        disabled={submitted}
                        className={optionClasses}
                      >
                        <div className="flex items-center">
                          <span className="flex-1 text-gray-700 dark:text-gray-200">
                            {option}
                          </span>
                          {submitted && isCorrectOption && (
                            <span className="text-green-600 dark:text-green-400 font-bold ml-2">✓</span>
                          )}
                          {submitted && isSelected && !isCorrectOption && (
                            <span className="text-red-600 dark:text-red-400 font-bold ml-2">✗</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 ml-8 p-4 rounded-lg ${
                    isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-blue-50 dark:bg-blue-900/20"
                  }`}>
                    <p className="text-sm font-medium mb-1 text-gray-800 dark:text-white">
                      {isCorrect ? "Correct! ✓" : "Incorrect ✗"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
              className={`font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors ${
                Object.keys(answers).length === questions.length
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Quiz
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {Object.keys(answers).length}/{questions.length} questions answered
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
