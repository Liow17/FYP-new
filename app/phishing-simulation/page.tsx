"use client";

import { useState } from "react";
import Link from "next/link";

interface EmailScenario {
  id?: number;
  from: string;
  subject: string;
  body: string;
  type?: string;
  isPhishing?: boolean;
  redFlags: string[];
  explanation: string;
}

interface URLScenario {
  id: number;
  url: string;
  displayText: string;
  isPhishing: boolean;
  explanation: string;
}

interface LoginPageScenario {
  id: number;
  siteName: string;
  url: string;
  hasHttps: boolean;
  hasSuspiciousDomain: boolean;
  hasSpellingErrors: boolean;
  isPhishing: boolean;
  explanation: string;
}

const emailScenarios: EmailScenario[] = [
  {
    id: 1,
    from: "security@paypa1-support.com",
    subject: "URGENT: Your Account Has Been Locked",
    body: "Dear Valued Customer,\n\nYour PayPal account has been locked due to suspicious activity. To unlock your account immediately, please click the link below and verify your information within 24 hours or your account will be permanently deleted.\n\nClick here to verify: http://paypa1-verify.com/login\n\nThank you,\nPayPal Security Team",
    isPhishing: true,
    redFlags: [
      "Sender domain 'paypa1-support.com' uses number '1' instead of letter 'l'",
      "Creates urgency with threats of account deletion",
      "Generic greeting 'Dear Valued Customer' instead of your name",
      "Suspicious URL with HTTP instead of HTTPS",
      "Domain 'paypa1-verify.com' is not official PayPal domain"
    ],
    explanation: "This is a classic phishing email. Legitimate companies don't threaten to delete accounts, use generic greetings, or send suspicious links. Always verify by going directly to the company's official website."
  },
  {
    id: 2,
    from: "it-support@yourcompany.com",
    subject: "Password Reset Required",
    body: "Hello John Smith,\n\nAs part of our routine security update, we need you to reset your password. Please use the link below to access the secure password reset portal:\n\nhttps://yourcompany.com/reset-password\n\nIf you have any questions, please contact IT Support at extension 4521.\n\nBest regards,\nIT Support Team\nYour Company Inc.",
    isPhishing: false,
    redFlags: [],
    explanation: "This appears to be a legitimate email. It uses your actual name, comes from the company domain, links to the official company website with HTTPS, provides contact information, and doesn't create false urgency."
  },
  {
    id: 3,
    from: "no-reply@amazon-security.xyz",
    subject: "Confirm Your Recent Order #8729-4561",
    body: "Dear Customer,\n\nWe noticed an order for $899.99 was placed on your account. If you did not make this purchase, please click below to cancel:\n\nhttp://amzn-secure-cancel.xyz/order/cancel?id=8729\n\nOrder Details:\n- iPhone 14 Pro Max\n- Quantity: 1\n- Total: $899.99\n\nAmazon Customer Service",
    isPhishing: true,
    redFlags: [
      "Domain '.xyz' is suspicious for Amazon",
      "Creates urgency with fake high-value order",
      "Generic greeting without your actual name",
      "URL uses HTTP instead of HTTPS",
      "Suspicious domain 'amzn-secure-cancel.xyz' is not amazon.com"
    ],
    explanation: "This phishing email uses fear tactics about a fake purchase to get you to click. Amazon uses amazon.com domain, HTTPS links, and doesn't use '.xyz' domains. Always check orders by logging into the official website directly."
  }
];

const urlScenarios: URLScenario[] = [
  {
    id: 1,
    url: "http://g00gle.com/signin",
    displayText: "Google Sign In",
    isPhishing: true,
    explanation: "This URL uses '00' (zeros) instead of 'oo' in 'google'. This is called typosquatting. The legitimate Google domain is 'google.com' with the letter 'o', not the number '0'."
  },
  {
    id: 2,
    url: "https://login.microsoft.com/oauth2/authorize",
    displayText: "Microsoft Login",
    isPhishing: false,
    explanation: "This is a legitimate Microsoft URL. It uses HTTPS, the correct domain 'microsoft.com', and a standard OAuth path. Always verify the exact domain spelling."
  },
  {
    id: 3,
    url: "https://secure-netflix-billing.com/update-payment",
    displayText: "Update Netflix Payment",
    isPhishing: true,
    explanation: "While this uses HTTPS, the domain 'secure-netflix-billing.com' is NOT the official Netflix domain. The real Netflix uses 'netflix.com'. Attackers can get HTTPS certificates for phishing sites too."
  }
];

const loginPageScenarios: LoginPageScenario[] = [
  {
    id: 1,
    siteName: "PayPal",
    url: "http://paypal-secure.support.com",
    hasHttps: false,
    hasSuspiciousDomain: true,
    hasSpellingErrors: false,
    isPhishing: true,
    explanation: "This is a phishing site. It lacks HTTPS encryption and uses a fake domain 'paypal-secure.support.com'. The real PayPal is at 'paypal.com' and always uses HTTPS."
  },
  {
    id: 2,
    siteName: "Facebook",
    url: "https://facebook.com/login",
    hasHttps: true,
    hasSuspiciousDomain: false,
    hasSpellingErrors: false,
    isPhishing: false,
    explanation: "This is legitimate. It uses HTTPS, the correct domain 'facebook.com', and has no suspicious elements. Always verify these security indicators before logging in."
  },
  {
    id: 3,
    siteName: "Apple ID",
    url: "https://appleid.apple.com.verify-account.net",
    hasHttps: true,
    hasSuspiciousDomain: true,
    hasSpellingErrors: false,
    isPhishing: true,
    explanation: "Despite having HTTPS, this is a phishing site. The actual domain is 'verify-account.net', NOT 'apple.com'. The real Apple ID site is 'appleid.apple.com'. Attackers place legitimate-looking text before their fake domain."
  }
];

export default function PhishingSimulation() {
  // Phishing Detector state
  const [detectorInput, setDetectorInput] = useState("");
  const [detectorType, setDetectorType] = useState<"email" | "url">("email");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);

  // Email simulation state
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [emailAnswers, setEmailAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [showEmailExplanation, setShowEmailExplanation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicEmail, setDynamicEmail] = useState<EmailScenario | null>(null);
  const [useDynamicEmail, setUseDynamicEmail] = useState(false);

  // Combined URL & Login page simulation state
  const [phishingAnswers, setPhishingAnswers] = useState<{ [key: string]: boolean | null }>({});
  const [showPhishingExplanations, setShowPhishingExplanations] = useState<{ [key: string]: boolean }>({});
  const [isGeneratingPhishing, setIsGeneratingPhishing] = useState(false);
  const [generatedUrlScenarios, setGeneratedUrlScenarios] = useState<URLScenario[]>([]);
  const [generatedLoginScenarios, setGeneratedLoginScenarios] = useState<LoginPageScenario[]>([]);

  // Get the current email (either dynamic or from static scenarios)
  const currentEmail = useDynamicEmail && dynamicEmail
    ? dynamicEmail
    : emailScenarios[currentEmailIndex];

  // Detect phishing in user-provided content
  const handleDetectPhishing = async () => {
    if (!detectorInput.trim()) {
      alert("Please enter some content to analyze.");
      return;
    }

    setIsDetecting(true);
    setDetectionResult(null);

    try {
      const response = await fetch("/api/detect-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: detectorInput,
          type: detectorType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to detect phishing");
      }

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setDetectionResult(data.analysis);
    } catch (error) {
      console.error("Error detecting phishing:", error);
      alert("Unable to analyze content. This feature requires network access and API configuration.");
    } finally {
      setIsDetecting(false);
    }
  };

  // Generate a new dynamic phishing scenario
  const generateNewScenario = async () => {
    setIsGenerating(true);
    setShowEmailExplanation(false);
    try {
      const response = await fetch("/api/generate-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty: "medium" }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate scenario");
      }

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      // Convert the scenario to our format
      const newScenario: EmailScenario = {
        from: data.scenario.from,
        subject: data.scenario.subject,
        body: data.scenario.body,
        type: data.scenario.type,
        isPhishing: data.scenario.type.toLowerCase() === "phishing",
        redFlags: data.scenario.redFlags || [],
        explanation: data.scenario.explanation,
      };

      setDynamicEmail(newScenario);
      setUseDynamicEmail(true);
    } catch (error) {
      console.error("Error generating scenario:", error);
      alert("Unable to generate a new scenario. This feature requires network access.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmailAnswer = async (isPhishing: boolean) => {
    const emailId = currentEmail.id || 0;
    setEmailAnswers({ ...emailAnswers, [emailId]: isPhishing });
    setShowEmailExplanation(true);
  };

  const handleNextEmail = () => {
    if (useDynamicEmail) {
      // In dynamic mode, reset to allow new generation
      setUseDynamicEmail(false);
      setDynamicEmail(null);
    } else if (currentEmailIndex < emailScenarios.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
    }
    setShowEmailExplanation(false);
  };

  const handlePrevEmail = () => {
    if (useDynamicEmail) {
      // Exit dynamic mode and go back to static scenarios
      setUseDynamicEmail(false);
      setDynamicEmail(null);
    } else if (currentEmailIndex > 0) {
      setCurrentEmailIndex(currentEmailIndex - 1);
    }
    setShowEmailExplanation(false);
  };

  const handlePhishingAnswer = (scenarioId: string, isPhishing: boolean) => {
    setPhishingAnswers({ ...phishingAnswers, [scenarioId]: isPhishing });
    setShowPhishingExplanations({ ...showPhishingExplanations, [scenarioId]: true });
  };

  // Generate new URL and Login scenarios (replaces all previous ones)
  const generateNewPhishingScenarios = async () => {
    setIsGeneratingPhishing(true);
    try {
      // Generate 3 URL scenarios and 3 login scenarios (6 total)
      const requests = [
        ...Array(3).fill(null).map(() => 
          fetch("/api/generate-url-scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        ),
        ...Array(3).fill(null).map(() =>
          fetch("/api/generate-login-scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        ),
      ];

      const responses = await Promise.all(requests);

      // Check if all responses are ok
      if (!responses.every(r => r.ok)) {
        throw new Error("Failed to generate scenarios");
      }

      // Parse all responses
      const data = await Promise.all(responses.map(r => r.json()));

      // Check for errors
      if (data.some(d => d.error)) {
        alert(`Error: ${data.find(d => d.error)?.error}`);
        return;
      }

      // Split data into URL and Login scenarios
      const urlData = data.slice(0, 3);
      const loginData = data.slice(3, 6);

      // Create URL scenarios
      const newUrlScenarios: URLScenario[] = urlData.map((d, index) => ({
        ...d.scenario,
        id: index + 1,
      }));

      // Create Login scenarios
      const newLoginScenarios: LoginPageScenario[] = loginData.map((d, index) => ({
        ...d.scenario,
        id: index + 1,
        hasSpellingErrors: false,
      }));

      setGeneratedUrlScenarios(newUrlScenarios);
      setGeneratedLoginScenarios(newLoginScenarios);
      
      // Clear previous answers
      setPhishingAnswers({});
      setShowPhishingExplanations({});
    } catch (error) {
      console.error("Error generating phishing scenarios:", error);
      alert("Unable to generate new scenarios. This feature requires network access.");
    } finally {
      setIsGeneratingPhishing(false);
    }
  };

  const emailId = currentEmail.id || 0;
  const currentEmailIsPhishing = currentEmail.isPhishing || currentEmail.type?.toLowerCase() === 'phishing';
  const isEmailCorrect = emailAnswers[emailId] === currentEmailIsPhishing;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Link href="/phishing-awareness" className="text-purple-600 dark:text-purple-400 hover:underline mb-8 inline-block items-center gap-2">
          <span>🏠</span>
          <span>← Back to Phishing Awareness</span>
        </Link>

        <header className="text-center mb-12">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Phishing Simulation Training
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Practice identifying phishing attempts in realistic scenarios. Test your skills with suspicious emails, URLs, and fake login pages.
          </p>
        </header>

        {/* Key Takeaways */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              💡 Key Takeaways
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Always verify the sender's email domain</strong> - Look for misspellings or suspicious domains</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Check for HTTPS and the exact domain</strong> - Don't be fooled by similar-looking URLs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Be suspicious of urgency and threats</strong> - Legitimate companies don't threaten account deletion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Hover over links before clicking</strong> - The displayed text may not match the actual URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>When in doubt, go directly to the official website</strong> - Don't click email links for sensitive actions</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Phishing Detector */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            🔍 Phishing Email & Link Detector
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Paste a suspicious email or URL below and let AI analyze it for phishing indicators
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            {/* Type selector */}
            <div className="flex gap-4 mb-4 justify-center">
              <button
                onClick={() => setDetectorType("email")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  detectorType === "email"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                📧 Email Content
              </button>
              <button
                onClick={() => setDetectorType("url")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  detectorType === "url"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                🔗 URL/Link
              </button>
            </div>

            {/* Input area */}
            <textarea
              value={detectorInput}
              onChange={(e) => setDetectorInput(e.target.value)}
              placeholder={
                detectorType === "email"
                  ? "Paste the email content here (including sender, subject, and body)..."
                  : "Paste the suspicious URL here (e.g., http://paypa1.com/login)..."
              }
              className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm resize-none"
            />

            {/* Analyze button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleDetectPhishing}
                disabled={isDetecting || !detectorInput.trim()}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isDetecting || !detectorInput.trim()
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                }`}
              >
                {isDetecting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </span>
                ) : (
                  "🔍 Analyze for Phishing"
                )}
              </button>
            </div>

            {/* Detection Result */}
            {detectionResult && (
              <div className="mt-6">
                <div
                  className={`p-6 rounded-lg border-2 ${
                    detectionResult.isPhishing
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : "bg-green-50 dark:bg-green-900/20 border-green-500"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">
                      {detectionResult.isPhishing ? "🚨" : "✅"}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {detectionResult.isPhishing ? "Phishing Detected!" : "Looks Safe"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Risk Level: <span className="font-semibold capitalize">{detectionResult.riskLevel}</span> |
                        Confidence: <span className="font-semibold capitalize">{detectionResult.confidence}</span>
                      </p>
                    </div>
                  </div>

                  {detectionResult.redFlags && detectionResult.redFlags.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2">🚩 Red Flags Found:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {detectionResult.redFlags.map((flag: string, index: number) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">📊 Analysis:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{detectionResult.analysis}</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">💡 Recommendation:</h4>
                    <p className="text-blue-700 dark:text-blue-300">{detectionResult.recommendation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Email Scenario Simulation */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              📧 Email Scenario Analysis
            </h2>
            <button
              onClick={generateNewScenario}
              disabled={isGenerating}
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate New Scenario
                </>
              )}
            </button>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Examine the email below. Is it legitimate or a phishing attempt?
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
            {/* Email Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">From: </span>
                <span className="text-gray-800 dark:text-white font-mono">{currentEmail.from}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Subject: </span>
                <span className="text-gray-800 dark:text-white">{currentEmail.subject}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">
                {currentEmail.body}
              </pre>
            </div>

            {/* Answer Buttons */}
            {!showEmailExplanation && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleEmailAnswer(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  🚨 This is Phishing
                </button>
                <button
                  onClick={() => handleEmailAnswer(false)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  ✅ This is Legitimate
                </button>
              </div>
            )}

            {/* Explanation */}
            {showEmailExplanation && (
              <div className="space-y-4">
                {/* Standard Explanation */}
                <div className={`p-6 rounded-lg ${isEmailCorrect ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'}`}>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {isEmailCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </h3>

                  <p className="text-gray-800 dark:text-gray-200 mb-4">
                    <strong>Answer:</strong> This email is {(currentEmail.isPhishing || currentEmail.type?.toLowerCase() === 'phishing') ? 'PHISHING' : 'LEGITIMATE'}
                  </p>

                  {currentEmail.redFlags.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 dark:text-white mb-2">🚩 Red Flags:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {currentEmail.redFlags.map((flag, index) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Explanation:</strong> {currentEmail.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {useDynamicEmail ? (
            <div className="flex justify-center items-center">
              <button
                onClick={handlePrevEmail}
                className="px-6 py-2 rounded-lg font-semibold transition-colors bg-purple-600 hover:bg-purple-700 text-white"
              >
                ← Back to Examples
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevEmail}
                disabled={currentEmailIndex === 0}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  currentEmailIndex === 0
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                ← Previous
              </button>

              <span className="text-gray-600 dark:text-gray-300">
                Email {currentEmailIndex + 1} of {emailScenarios.length}
              </span>

              <button
                onClick={handleNextEmail}
                disabled={currentEmailIndex === emailScenarios.length - 1}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  currentEmailIndex === emailScenarios.length - 1
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </section>

        {/* Combined Phishing Detection - URL & Login Pages */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              🔗 URL & Login Page Detection
            </h2>
            <button
              onClick={generateNewPhishingScenarios}
              disabled={isGeneratingPhishing}
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              {isGeneratingPhishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate New Scenario
                </>
              )}
            </button>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Test your skills by examining suspicious URLs and fake login pages. Can you identify the phishing attempts?
          </p>

          <div className="space-y-6">
            {/* URL Scenario */}
            {(generatedUrlScenarios.length > 0 ? generatedUrlScenarios : urlScenarios).map((scenario) => {
              const scenarioKey = `url-${scenario.id}`;
              const userAnswer = phishingAnswers[scenarioKey];
              const isCorrect = userAnswer === scenario.isPhishing;
              const hasAnswered = userAnswer !== undefined && userAnswer !== null;

              return (
                <div key={scenarioKey} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    🔗 Suspicious Link
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Link appears as:</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {scenario.displayText}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Actual URL:</p>
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm break-all text-gray-800 dark:text-white">
                      {scenario.url}
                    </div>
                  </div>

                  {!hasAnswered && (
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handlePhishingAnswer(scenarioKey, true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                      >
                        🚨 Phishing
                      </button>
                      <button
                        onClick={() => handlePhishingAnswer(scenarioKey, false)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                      >
                        ✅ Safe
                      </button>
                    </div>
                  )}

                  {showPhishingExplanations[scenarioKey] && (
                    <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'}`}>
                      <p className="font-bold mb-2 text-gray-800 dark:text-white">
                        {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </p>
                      <p className="text-gray-800 dark:text-white mb-2">
                        <strong>This URL is {scenario.isPhishing ? 'PHISHING' : 'SAFE'}</strong>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {scenario.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Login Page Scenario */}
            {(generatedLoginScenarios.length > 0 ? generatedLoginScenarios : loginPageScenarios).map((scenario) => {
              const scenarioKey = `login-${scenario.id}`;
              const userAnswer = phishingAnswers[scenarioKey];
              const isCorrect = userAnswer === scenario.isPhishing;
              const hasAnswered = userAnswer !== undefined && userAnswer !== null;

              return (
                <div key={scenarioKey} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    🔐 {scenario.siteName} Login Page
                  </h3>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${scenario.hasHttps ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {scenario.hasHttps ? '🔒 HTTPS' : '⚠️ HTTP'}
                      </span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm break-all text-gray-800 dark:text-white">
                      {scenario.url}
                    </div>
                  </div>

                  {!hasAnswered && (
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handlePhishingAnswer(scenarioKey, true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                      >
                        🚨 Fake/Phishing
                      </button>
                      <button
                        onClick={() => handlePhishingAnswer(scenarioKey, false)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                      >
                        ✅ Legitimate
                      </button>
                    </div>
                  )}

                  {showPhishingExplanations[scenarioKey] && (
                    <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'}`}>
                      <p className="font-bold mb-2 text-gray-800 dark:text-white">
                        {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </p>
                      <p className="text-gray-800 dark:text-white mb-2">
                        <strong>This is {scenario.isPhishing ? 'a FAKE/PHISHING site' : 'LEGITIMATE'}</strong>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {scenario.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
