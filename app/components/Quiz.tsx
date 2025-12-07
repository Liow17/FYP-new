'use client';

import { useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
}

export default function Quiz({ questions, title }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!submitted) {
      const newAnswers = [...selectedAnswers];
      newAnswers[questionIndex] = answerIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    const correctCount = selectedAnswers.reduce((count: number, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    setScore(correctCount);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = selectedAnswers.every((answer) => answer !== null);
  const percentage = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>

      {submitted && (
        <div className={`mb-6 p-4 rounded-lg ${
          percentage >= 70 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="text-center">
            <p className={`text-2xl font-bold ${
              percentage >= 70 ? 'text-green-700' : 'text-yellow-700'
            }`}>
              Your Score: {score} / {questions.length} ({percentage}%)
            </p>
            <p className={`mt-2 ${
              percentage >= 70 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {percentage >= 70
                ? '🎉 Great job! You have a solid understanding of the material.'
                : '📚 Review the material and try again to improve your score.'}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const isCorrect = selectedAnswers[qIndex] === question.correctAnswer;
          const showFeedback = submitted;

          return (
            <div
              key={qIndex}
              className={`border rounded-lg p-4 ${
                showFeedback
                  ? isCorrect
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <p className="font-semibold text-gray-900 mb-3">
                {qIndex + 1}. {question.question}
              </p>

              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex;
                  const isCorrectOption = oIndex === question.correctAnswer;

                  let optionClasses = 'block w-full text-left p-3 rounded-lg border transition-colors ';

                  if (showFeedback) {
                    if (isCorrectOption) {
                      optionClasses += 'border-green-500 bg-green-100 text-green-900';
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses += 'border-red-500 bg-red-100 text-red-900';
                    } else {
                      optionClasses += 'border-gray-200 bg-white text-gray-600';
                    }
                  } else {
                    optionClasses += isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      disabled={submitted}
                      className={optionClasses}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">
                          {showFeedback && isCorrectOption && '✓'}
                          {showFeedback && isSelected && !isCorrectOption && '✗'}
                        </span>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              allAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>

      {!submitted && !allAnswered && (
        <p className="text-sm text-gray-500 text-center mt-3">
          Please answer all questions before submitting
        </p>
      )}
    </div>
  );
}
