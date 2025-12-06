"use client";

import { useState } from "react";
import Link from "next/link";
import zxcvbn from "zxcvbn";

export default function PasswordSecurity() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = password ? zxcvbn(password) : null;
  const score = result?.score ?? 0;

  const getStrengthLabel = (score: number) => {
    const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return labels[score];
  };

  const getStrengthColor = (score: number) => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
    return colors[score];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <header className="text-center mb-12">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Password Security
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn about creating strong, secure passwords and test your password strength with our interactive meter <span className="text-gray-500 dark:text-gray-400">powered by zxcvbn</span>.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Educational Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Why Password Security Matters
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Passwords are the first line of defense for your online accounts. Weak passwords can be easily guessed or cracked by attackers, leading to unauthorized access to your personal information, financial data, and digital identity.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 mt-6">
              Characteristics of Strong Passwords
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Length:</strong> At least 12-16 characters (longer is better)</li>
              <li><strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and special characters</li>
              <li><strong>Unpredictability:</strong> Avoid common words, patterns, and personal information</li>
              <li><strong>Uniqueness:</strong> Use different passwords for different accounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 mt-6">
              Common Password Mistakes to Avoid
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Using "password", "123456", or other common passwords</li>
              <li>Including personal information (birthdays, names, addresses)</li>
              <li>Using keyboard patterns (qwerty, asdfgh)</li>
              <li>Reusing passwords across multiple accounts</li>
              <li>Storing passwords in plain text</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 mt-6">
              Best Practices
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Use a password manager to generate and store complex passwords</li>
              <li>Enable two-factor authentication (2FA) whenever possible</li>
              <li>Change passwords if you suspect they've been compromised</li>
              <li>Never share your passwords with others</li>
              <li>Use passphrase techniques: combine random words (e.g., "correct-horse-battery-staple")</li>
            </ul>
          </div>

          {/* Interactive Password Strength Meter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Interactive Password Strength Meter
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Test different password combinations and see how strong they are. This tool uses zxcvbn, a password strength estimator created by Dropbox.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter a password to test:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Type a password here..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {password && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Strength: {getStrengthLabel(score)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Score: {score}/4
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor(score)}`}
                        style={{ width: `${(score / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {result?.feedback.warning && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Warning:</strong> {result.feedback.warning}
                      </p>
                    </div>
                  )}

                  {result?.feedback.suggestions && result.feedback.suggestions.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Suggestions:
                      </p>
                      <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {result.feedback.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-600 dark:text-gray-400">Length</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{password.length} characters</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-600 dark:text-gray-400">Time to crack</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{result?.crack_times_display.offline_slow_hashing_1e4_per_second}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quiz Link */}
          <div className="text-center">
            <Link
              href="/password-security/quiz"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors"
            >
              Test Your Knowledge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
