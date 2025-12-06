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
    question: "What is the minimum recommended length for a strong password?",
    options: ["6 characters", "8 characters", "12 characters", "20 characters"],
    correctAnswer: 2,
    explanation: "Security experts recommend passwords of at least 12-16 characters. Longer passwords are exponentially harder to crack through brute force attacks."
  },
  {
    id: 2,
    question: "Which of the following is the STRONGEST password?",
    options: ["password123", "JohnDoe1990", "Tr0ub4dor&3", "correct-horse-battery-staple"],
    correctAnswer: 3,
    explanation: "The passphrase 'correct-horse-battery-staple' is strongest because it's long, unpredictable, and doesn't follow common patterns. Length and randomness are more important than complexity."
  },
  {
    id: 3,
    question: "What is the main risk of reusing the same password across multiple accounts?",
    options: [
      "It's harder to remember",
      "If one account is breached, all accounts are at risk",
      "It violates terms of service",
      "Passwords expire faster"
    ],
    correctAnswer: 1,
    explanation: "If one service is compromised and your password is leaked, attackers will try that password on other popular services. Using unique passwords for each account contains the damage to just one account."
  },
  {
    id: 4,
    question: "Which tool is MOST recommended for managing multiple complex passwords?",
    options: [
      "Writing them in a notebook",
      "Saving them in a text file on your computer",
      "Using a reputable password manager",
      "Using the same password with slight variations"
    ],
    correctAnswer: 2,
    explanation: "Password managers securely encrypt and store your passwords, generate strong random passwords, and autofill credentials. They're much more secure than writing passwords down or reusing them."
  },
  {
    id: 5,
    question: "What does two-factor authentication (2FA) add to password security?",
    options: [
      "It makes passwords longer",
      "It requires a second form of verification beyond the password",
      "It changes your password automatically",
      "It encrypts your password"
    ],
    correctAnswer: 1,
    explanation: "2FA adds an extra layer of security by requiring something you have (like a phone) or something you are (like a fingerprint) in addition to something you know (your password)."
  },
  {
    id: 6,
    question: "Which of these should you AVOID when creating a password?",
    options: [
      "Using special characters",
      "Making it longer than 12 characters",
      "Including your name or birthdate",
      "Using a mix of uppercase and lowercase"
    ],
    correctAnswer: 2,
    explanation: "Personal information like names, birthdates, addresses, or pet names should be avoided because attackers can often find this information through social media or public records."
  },
  {
    id: 7,
    question: "How often should you change a password that hasn't been compromised?",
    options: [
      "Every week",
      "Every month",
      "Only when there's evidence of a breach",
      "Never"
    ],
    correctAnswer: 2,
    explanation: "Modern security guidance suggests changing passwords only when necessary (like after a breach). Frequent mandatory changes often lead to weaker passwords and poor practices like incremental changes."
  },
  {
    id: 8,
    question: "What makes a password 'unpredictable'?",
    options: [
      "Using all capital letters",
      "Avoiding common words, patterns, and personal information",
      "Using only numbers",
      "Making it exactly 8 characters long"
    ],
    correctAnswer: 1,
    explanation: "Unpredictability comes from avoiding patterns that attackers expect: dictionary words, keyboard patterns, common substitutions (like '@' for 'a'), and personal information."
  },
  {
    id: 9,
    question: "Which type of attack tries all possible password combinations until finding the correct one?",
    options: [
      "Phishing attack",
      "Brute force attack",
      "Social engineering",
      "Man-in-the-middle attack"
    ],
    correctAnswer: 1,
    explanation: "A brute force attack systematically tries every possible combination of characters until the correct password is found. Longer, more complex passwords exponentially increase the time required for such attacks."
  },
  {
    id: 10,
    question: "What is the BEST way to secure accounts that store sensitive information?",
    options: [
      "Use the same strong password across all accounts",
      "Use a unique strong password AND enable multi-factor authentication",
      "Change your password every week",
      "Use a short password but change it frequently"
    ],
    correctAnswer: 1,
    explanation: "The strongest security comes from combining a unique, strong password with multi-factor authentication (2FA/MFA). This layered approach ensures that even if your password is compromised, attackers still cannot access your account."
  }
];

export default function PasswordQuiz() {
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
        <Link href="/password-security" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to Password Security
        </Link>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Password Security Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test your understanding of password security concepts
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
                {percentage >= 90 ? "Excellent! You have a strong understanding of password security." :
                 percentage >= 70 ? "Good job! Review the explanations below to strengthen your knowledge." :
                 "Keep learning! Review the explanations to improve your understanding."}
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
