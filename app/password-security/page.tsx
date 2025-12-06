import Link from 'next/link';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import Quiz, { QuizQuestion } from '../components/Quiz';

const quizQuestions: QuizQuestion[] = [
  {
    question: 'What is the minimum recommended length for a strong password?',
    options: ['6 characters', '8 characters', '12 characters', '20 characters'],
    correctAnswer: 2,
    explanation: 'Security experts recommend passwords be at least 12 characters long. Longer passwords are exponentially harder to crack through brute-force attacks.',
  },
  {
    question: 'Which of the following makes a password stronger?',
    options: [
      'Using your birthdate',
      'Repeating the same character multiple times',
      'Mixing uppercase, lowercase, numbers, and symbols',
      'Using a common word from the dictionary',
    ],
    correctAnswer: 2,
    explanation: 'A strong password uses a mix of character types (uppercase, lowercase, numbers, and symbols). This increases complexity and makes the password harder to guess or crack.',
  },
  {
    question: 'Why should you avoid reusing passwords across different accounts?',
    options: [
      'It makes passwords easier to remember',
      'If one account is compromised, all accounts with the same password are at risk',
      'It is required by law',
      'It has no security impact',
    ],
    correctAnswer: 1,
    explanation: 'If you reuse passwords and one service is breached, attackers can use that password to access your other accounts. This is called credential stuffing.',
  },
  {
    question: 'What is a passphrase?',
    options: [
      'A very short password',
      'A password made up of multiple random words',
      'A password written on a piece of paper',
      'A password shared with others',
    ],
    correctAnswer: 1,
    explanation: 'A passphrase is a sequence of random words or a sentence that is easy to remember but hard to crack. For example: "correct horse battery staple".',
  },
  {
    question: 'Which of these is the most secure way to store your passwords?',
    options: [
      'Write them down on a sticky note',
      'Save them in a text file on your desktop',
      'Use a reputable password manager',
      'Use the same password for everything so you only need to remember one',
    ],
    correctAnswer: 2,
    explanation: 'A password manager securely encrypts and stores all your passwords, allowing you to use strong, unique passwords for each account without having to memorize them all.',
  },
  {
    question: 'What should you do if you suspect a service you use has been breached?',
    options: [
      'Ignore it and hope for the best',
      'Immediately change your password for that service',
      'Delete your account',
      'Share your password with customer support',
    ],
    correctAnswer: 1,
    explanation: 'If a service has been breached, change your password immediately. Also change passwords on any other accounts where you used the same or similar password.',
  },
];

export default function PasswordSecurity() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-3">🔐</span>
            Password Security
          </h1>
          <p className="text-lg text-gray-700">
            Learn how to create and manage secure passwords to protect your digital identity.
          </p>
        </div>

        {/* Educational Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Password Security Matters</h2>

          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 mb-4">
              Passwords are the primary defense protecting your personal information, financial data, and online identity.
              Weak passwords make it easy for attackers to gain unauthorized access to your accounts, potentially leading to
              identity theft, financial loss, and privacy breaches.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Common Password Mistakes
            </h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Using personal information (names, birthdates, pet names)</li>
              <li>Using common words or predictable patterns (e.g., "password123")</li>
              <li>Reusing the same password across multiple accounts</li>
              <li>Using short passwords (less than 12 characters)</li>
              <li>Storing passwords insecurely (sticky notes, unencrypted files)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Best Practices for Strong Passwords
            </h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✓</span>
                  <span><strong>Length:</strong> Use at least 12 characters (longer is better)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✓</span>
                  <span><strong>Complexity:</strong> Mix uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✓</span>
                  <span><strong>Uniqueness:</strong> Use different passwords for different accounts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✓</span>
                  <span><strong>Unpredictability:</strong> Avoid dictionary words and personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">✓</span>
                  <span><strong>Tools:</strong> Consider using a password manager to generate and store passwords</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Multi-Factor Authentication (MFA)
            </h3>
            <p className="text-gray-700 mb-4">
              Even strong passwords can be compromised. Multi-factor authentication adds an extra layer of security
              by requiring a second form of verification (like a code sent to your phone) in addition to your password.
              Always enable MFA when available, especially for important accounts like email and banking.
            </p>
          </div>
        </div>

        {/* Password Strength Meter */}
        <div className="mb-8">
          <PasswordStrengthMeter />
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Password Security Quiz" />
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
          <Link
            href="/phishing-awareness"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Next Module: Phishing Awareness →
          </Link>
        </div>
      </div>
    </div>
  );
}
