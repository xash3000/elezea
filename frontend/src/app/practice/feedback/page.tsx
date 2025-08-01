import Link from "next/link";
import FeedbackCard from "@/components/FeedbackCard";

interface FeedbackData {
  score: number;
  corrections: { original: string; improved: string; reason: string }[];
  suggestions: string[];
}

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ searchParamsText: string }>;
}) {

  const { searchParamsText = "" } = await searchParams;

  const feedback: FeedbackData = {
    score: Math.min(100, Math.floor(searchParamsText.length * 0.8)),
    corrections: [
      {
        original: "big",
        improved: "spacious",
        reason: "More descriptive adjective",
      },
      {
        original: "is nice",
        improved: "has a charming ambiance",
        reason: "Rich vocabulary suggestion",
      },
    ],
    suggestions: [
      "Try adding more sensory details (sounds, smells)",
      "Use past tense consistently throughout",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Score Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Your Writing Score</h1>
            <div className="text-5xl font-bold mt-2">{feedback.score}/100</div>
          </div>
        </div>

        {/* Feedback and Buttons */}
        <div className="p-6">
          <FeedbackCard {...feedback} />

          <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">
            {/* Back to Home - Left */}
            <Link
              href="/"
              className="flex-1 text-center border border-gray-300 hover:bg-gray-100 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              🏠 Back to Home
            </Link>

            {/* Try Another - Center */}
            <Link
              href="/practice"
              className="flex-1 text-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              🖼️ Try Another
            </Link>

            {/* Edit Your Description - Right */}
            <Link
              href={`/practice?text=${encodeURIComponent(searchParamsText)}`}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              ✏️ Edit Your Description
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
