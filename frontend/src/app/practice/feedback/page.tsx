"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FeedbackCard from "@/components/FeedbackCard";
import Link from "next/link";
import config from "@/config";

interface FeedbackData {
  score: number;
  corrections: [string, string][];
  suggestions: string[];
  isEvaluated: boolean;
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");
  const descriptionText = searchParams.get("text") || "";

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submissionId) return;

    const pollInterval = setInterval(async () => {
      try {
        const feedbackRes = await fetch(
          `${config.apiBaseUrl}/api/submission/${submissionId}/status`
        );

        if (!feedbackRes.ok) {
          throw new Error("Failed to fetch feedback.");
        }

        const feedbackData: FeedbackData = await feedbackRes.json();
        console.log("Received feedback:", feedbackData);

        if (feedbackData.isEvaluated) {
          clearInterval(pollInterval);
          setFeedback(feedbackData);
          setLoading(false);
        }
      } catch (err) {
        clearInterval(pollInterval);
        setError("Error while fetching feedback.");
        setLoading(false);
      }
    }, 500);

    return () => clearInterval(pollInterval);
  }, [submissionId ?? ""]); // <- ensure stable value

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Evaluating your writing... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        {error}
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        No feedback received.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Score Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Your Writing Score</h1>
            <div className="text-5xl font-bold mt-2">{Math.round(feedback.score * 100)}/100</div>
          </div>
        </div>

        {/* Feedback Body */}
        <div className="p-6">
          <FeedbackCard
            score={feedback.score}
            corrections={feedback.corrections.map(([wrong, correct]) => ({
              original: wrong,
              improved: correct,
              reason: "",
            }))}
            suggestions={feedback.suggestions}
          />

          <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">
            <Link
              href="/"
              className="flex-1 text-center border border-gray-300 hover:bg-gray-100 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              🏠 Back to Home
            </Link>

            <Link
              href="/practice"
              className="flex-1 text-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              🖼️ Try Another
            </Link>

            <Link
              href={`/practice?text=${encodeURIComponent(descriptionText)}`}
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
