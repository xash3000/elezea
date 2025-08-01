export default function FeedbackCard({
  score,
  corrections,
  suggestions,
}: {
  score: number;
  corrections: { original: string; improved: string; reason: string }[];
  suggestions: string[];
}) {
  return (
    <div className="p-5">
      {/* The score section has been removed to avoid duplication. */}

      {/* Corrections Section */}
      {corrections.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Corrections</h2>
          <ul className="space-y-3">
            {corrections.map((item, i) => (
              <li
                key={i}
                className="p-3 bg-white rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center space-x-2 text-red-500 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="line-through text-base">{item.original}</p>
                </div>
                <div className="flex items-center space-x-2 text-green-600 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-base">{item.improved}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Suggestions</h2>
          <ul className="space-y-3">
            {suggestions.map((suggestion, i) => (
              <li
                key={i}
                className="flex items-start space-x-3 p-3 bg-white rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{suggestion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
