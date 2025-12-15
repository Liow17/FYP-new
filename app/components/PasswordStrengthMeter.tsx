'use client';

import { useState } from 'react';
import zxcvbn from 'zxcvbn';

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Analyze password strength using zxcvbn
  const result = password ? zxcvbn(password) : null;

  // Get strength label and color
  const getStrengthInfo = (score: number | null) => {
    if (score === null) return { label: 'Enter a password', color: 'bg-gray-300', textColor: 'text-gray-600' };

    const strengthLevels = [
      { label: 'Very Weak', color: 'bg-red-500', textColor: 'text-red-600' },
      { label: 'Weak', color: 'bg-orange-500', textColor: 'text-orange-600' },
      { label: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
      { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' },
      { label: 'Very Strong', color: 'bg-green-600', textColor: 'text-green-700' },
    ];

    return strengthLevels[score];
  };

  const strengthInfo = getStrengthInfo(result?.score ?? null);
  const strengthPercentage = result ? ((result.score + 1) / 5) * 100 : 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">
        Interactive Password Strength Meter
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Test Your Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a password to test..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {/* Strength Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">Strength:</span>
            <span className={`text-sm font-semibold ${strengthInfo.textColor}`}>
              {strengthInfo.label}
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${strengthInfo.color}`}
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>
        </div>

        {/* Feedback */}
        {result && password && (
          <div className="space-y-3 mt-4">
            {result.feedback.warning && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> {result.feedback.warning}
                </p>
              </div>
            )}

            {result.feedback.suggestions.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                <p className="text-sm font-semibold text-blue-800 mb-1">Suggestions:</p>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  {result.feedback.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded p-3">
              <p className="text-xs text-gray-600">
                <strong>Estimated crack time:</strong>{' '}
                {result.crack_times_display.offline_slow_hashing_1e4_per_second}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-900 border border-blue-700 rounded-lg p-4">
        <h4 className="font-semibold text-blue-100 mb-2">Tips for Strong Passwords:</h4>
        <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
          <li>Use at least 12 characters</li>
          <li>Mix uppercase and lowercase letters</li>
          <li>Include numbers and special characters</li>
          <li>Avoid common words and personal information</li>
          <li>Don't reuse passwords across different accounts</li>
          <li>Consider using a passphrase (multiple random words)</li>
        </ul>
      </div>
    </div>
  );
}
