import Link from 'next/link';

export default function PasswordSecurity() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block flex items-center gap-2">
          <span>🏠</span>
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Password Security
          </h1>
          <p className="text-lg text-gray-300">
            Learn how to create and manage secure passwords to protect your digital identity
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Educational Content */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Password Security Matters</h2>

            <div className="prose prose-blue max-w-none">
              <p className="text-gray-300 mb-4">
                Passwords are the primary defense protecting your personal information, financial data, and online identity.
                Weak passwords make it easy for attackers to gain unauthorized access to your accounts, potentially leading to
                identity theft, financial loss, and privacy breaches.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                Common Password Mistakes
              </h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Using personal information (names, birthdates, pet names)</li>
                <li>Using common words or predictable patterns (e.g., "password123")</li>
                <li>Reusing the same password across multiple accounts</li>
                <li>Using short passwords (less than 12 characters)</li>
                <li>Storing passwords insecurely (sticky notes, unencrypted files)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                Best Practices for Strong Passwords
              </h3>
              <div className="bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 font-bold">✓</span>
                    <span><strong className="text-white">Length:</strong> Use at least 12 characters (longer is better)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 font-bold">✓</span>
                    <span><strong className="text-white">Complexity:</strong> Mix uppercase, lowercase, numbers, and symbols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 font-bold">✓</span>
                    <span><strong className="text-white">Uniqueness:</strong> Use different passwords for different accounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 font-bold">✓</span>
                    <span><strong className="text-white">Unpredictability:</strong> Avoid dictionary words and personal information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 font-bold">✓</span>
                    <span><strong className="text-white">Tools:</strong> Consider using a password manager to generate and store passwords</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                Multi-Factor Authentication (MFA)
              </h3>
              <p className="text-gray-300 mb-4">
                Even strong passwords can be compromised. Multi-factor authentication adds an extra layer of security
                by requiring a second form of verification (like a code sent to your phone) in addition to your password.
                Always enable MFA when available, especially for important accounts like email and banking.
              </p>
            </div>
          </div>

          {/* Navigation Options */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Ready to Practice?
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              Choose how you'd like to continue your learning journey
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quiz Option */}
              <Link href="/password-security/quiz">
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-2 border-blue-500 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    Password Security Quiz
                  </h3>
                  <p className="text-gray-300 text-sm text-center">
                    Test your understanding with 10 questions about password security and best practices
                  </p>
                </div>
              </Link>

              {/* Password Strength Meter Option */}
              <Link href="/password-security/strength-meter">
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    Interactive Password Strength Meter
                  </h3>
                  <p className="text-gray-300 text-sm text-center">
                    Test the strength of your passwords and learn what makes them secure
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
