"use client";

import { useEffect, useState } from "react";

type SubmissionStatus = {
  id: number;
  isEvaluated: boolean;
  score: number;
  corrections: [string, string][];
  suggestions: string[];
  createdAt: string;
};

export default function StatusFetcher({ submissionId }: { submissionId: number }) {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://localhost:7259/api/submission/${submissionId}/status`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchStatus();
  }, [submissionId]);

  if (error) return <div className="text-red-500">❌ {error}</div>;
  if (!status) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded bg-gray-100 space-y-2">
      <p>
        <strong>ID:</strong> {status.id}
      </p>
      <p>
        <strong>Evaluated:</strong> {status.isEvaluated ? "✅" : "❌"}
      </p>
      <p>
        <strong>Score:</strong> {status.score}
      </p>
      <div>
        <strong>Corrections:</strong>
        <ul>
          {status.corrections.map(([wrong, right], i) => (
            <li key={i}>
              {wrong} ➜ {right}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Suggestions:</strong>
        <ul>
          {status.suggestions.map((s, i) => (
            <li key={i}>💡 {s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
