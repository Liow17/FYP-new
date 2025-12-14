import Link from "next/link";

export default function PhishingAwareness() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block flex items-center gap-2">
          <span>🏠</span>
          <span>← Back to Home</span>
        </Link>

        <header className="text-center mb-12">
          <div className="text-6xl mb-6">🎣</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Phishing Awareness
          </h1>
          <p className="text-lg text-gray-300">
            Learn to recognize and protect yourself from phishing attacks
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* What is Phishing */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              What is Phishing?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Phishing is a type of cyberattack where criminals impersonate legitimate organizations or individuals to trick you into revealing sensitive information such as passwords, credit card numbers, or personal data. These attacks typically occur through email, text messages, or fake websites.
            </p>
            <p className="text-gray-300">
              The term "phishing" comes from "fishing" - attackers cast out fraudulent messages like bait, hoping someone will "bite" by clicking malicious links or providing confidential information.
            </p>
          </div>

          {/* Types of Phishing */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Types of Phishing Attacks
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  📧 Email Phishing
                </h3>
                <p className="text-gray-300">
                  The most common form, where attackers send fraudulent emails appearing to be from banks, online services, or colleagues, asking you to click links or download attachments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  🎯 Spear Phishing
                </h3>
                <p className="text-gray-300">
                  Targeted attacks aimed at specific individuals or organizations. Attackers research their victims and craft personalized messages that appear more legitimate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  💬 SMS Phishing (Smishing)
                </h3>
                <p className="text-gray-300">
                  Phishing attacks delivered via text message, often claiming urgent account issues or package delivery problems to prompt immediate action.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  📞 Voice Phishing (Vishing)
                </h3>
                <p className="text-gray-300">
                  Phone calls from scammers impersonating tech support, government agencies, or banks, pressuring victims to share sensitive information or make payments.
                </p>
              </div>
            </div>
          </div>

          {/* Warning Signs */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Warning Signs of Phishing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Learn to identify these red flags in emails and messages:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🚨 Urgent or Threatening Language</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  "Your account will be closed!" or "Immediate action required!" creates panic to bypass critical thinking.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🔗 Suspicious Links</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Hover over links to check the actual URL. Phishing sites often use misspelled domains like "paypa1.com" instead of "paypal.com".
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">✉️ Generic Greetings</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  "Dear Customer" or "Dear User" instead of your actual name suggests mass-sent fraudulent messages.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">📎 Unexpected Attachments</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Unsolicited attachments, especially .exe, .zip, or Office documents with macros, may contain malware.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">📧 Sender Address Mismatch</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Check the sender's email address carefully. Legitimate companies use official domains, not free email services.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">💰 Too Good to Be True</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Lottery winnings, inheritance from unknown relatives, or unrealistic offers are classic phishing bait.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Poor Grammar and Spelling</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Professional organizations proofread their communications. Multiple errors suggest a scam.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🔒 Requests for Sensitive Information</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Legitimate companies never ask for passwords, PINs, or full credit card numbers via email.
                </p>
              </div>
            </div>
          </div>

          {/* How to Protect Yourself */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              How to Protect Yourself
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Verify Before You Click</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    If you receive an unexpected email from a company, don't click links. Instead, go directly to the official website by typing the URL yourself.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Check the URL Carefully</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Look for HTTPS and the padlock icon. Examine the domain name for misspellings or unusual characters.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Use Multi-Factor Authentication</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Even if your password is compromised through phishing, 2FA provides an additional layer of protection.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Keep Software Updated</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Security updates patch vulnerabilities that phishing attacks might exploit through malicious links or downloads.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Report Suspicious Messages</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Forward phishing emails to your IT department or the organization being impersonated. Delete the original.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Educate Yourself Continuously</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Phishing tactics evolve constantly. Stay informed about new scam techniques and share knowledge with others.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Use Email Filters</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Enable spam filters and anti-phishing tools in your email client to automatically detect and block many attacks.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Trust Your Instincts</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    If something feels off, it probably is. When in doubt, contact the organization directly through official channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Example: Spotting a Phishing Email
            </h2>

            <div className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-4">
              <div className="space-y-2 text-sm">
                <p><strong>From:</strong> security@paypa1-security.com</p>
                <p><strong>Subject:</strong> URGENT: Your account has been suspended!</p>
                <hr className="border-gray-300 dark:border-gray-600" />
                <p className="mt-4">Dear Customer,</p>
                <p className="mt-2">
                  We have detected unusual activity on your account. Your PayPal account has been temporarily suspended for your protection.
                </p>
                <p className="mt-2">
                  Please click the link below immediatly to verify your identity and restore access:
                </p>
                <p className="mt-2">
                  <a href="#" className="text-blue-600 underline">https://paypal-verify-account.com/secure/login</a>
                </p>
                <p className="mt-2">
                  If you do not verify within 24 hours, your account will be permanently closed and funds will be forfeited.
                </p>
                <p className="mt-4">Sincerely,<br />PayPal Security Team</p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">🚨 Red Flags in This Email:</h3>
              <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-2">
                <li>Sender address has a typo: "paypa1" instead of "paypal"</li>
                <li>Creates urgency with threats of account closure</li>
                <li>Generic greeting ("Dear Customer")</li>
                <li>Spelling error ("immediatly")</li>
                <li>Suspicious URL that doesn't match PayPal's official domain</li>
                <li>Threatens loss of funds to pressure quick action</li>
              </ul>
            </div>
          </div>

          {/* Navigation Options */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Ready to Practice?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Choose how you'd like to continue your learning journey
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/phishing-awareness/quiz">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-500 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                    Take the Quiz
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                    Test your understanding with 10 questions about phishing awareness and best practices
                  </p>
                </div>
              </Link>

              <Link href="/phishing-simulation">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                    Try the Simulation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                    Practice identifying phishing emails, suspicious URLs, and fake login pages in realistic scenarios
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
