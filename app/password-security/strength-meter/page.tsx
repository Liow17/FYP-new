import Link from 'next/link';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';

export default function StrengthMeterPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/password-security"
            className="inline-flex items-center text-blue-600 hover:text-blue-400 font-medium gap-2"
          >
            <span>←</span>
            <span>Back to Password Security</span>
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="mr-3">🔐</span>
            Interactive Password Strength Meter
          </h1>
          <p className="text-lg text-gray-300 text-center">
            Test your password strength and learn what makes a password secure.
          </p>
        </div>

        {/* Password Strength Meter */}
        <div className="mb-8">
          <PasswordStrengthMeter />
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center items-center bg-gray-800 rounded-lg shadow-lg p-6">
          <Link
            href="/password-security"
            className="text-blue-600 hover:text-blue-400 font-medium flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Password Security</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
