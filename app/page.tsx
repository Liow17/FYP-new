import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Cybersecurity Awareness Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn essential cybersecurity concepts through interactive modules designed for university students
          </p>
        </div>

        {/* Top Row - 2 Modules */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {/* Password Security Module */}
          <Link href="/password-security">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-700 hover:border-blue-500 duration-300">
              <div className="text-4xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Password Security
              </h2>
              <p className="text-gray-300 mb-4">
                Learn how to create strong, secure passwords and understand password security best practices.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Interactive password strength meter
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Real-time feedback using zxcvbn
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Practical security tips
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Knowledge assessment quiz
                </li>
              </ul>
              <div className="text-blue-400 font-semibold">
                Start Learning →
              </div>
            </div>
          </Link>

          {/* Phishing Awareness Module */}
          <Link href="/phishing-awareness">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-700 hover:border-red-500 duration-300">
              <div className="text-4xl mb-4">🎣</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Phishing Awareness
              </h2>
              <p className="text-gray-300 mb-4">
                Identify phishing attacks and protect yourself from social engineering threats.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Recognize phishing tactics
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Real-world examples
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Protection strategies
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Includes phishing simulation practice
                </li>
              </ul>
              <div className="text-red-400 font-semibold">
                Start Learning →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-2">
              About This Platform
            </h3>
            <p className="text-gray-300">
              This platform provides interactive, module-based learning for non-technical university students.
              All learning happens locally in your browser—no login or account required.
              Each module includes educational content, interactive tools, and automated quizzes to test your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
