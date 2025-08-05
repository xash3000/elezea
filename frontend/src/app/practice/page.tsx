"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ImageGenerator from "@/components/ImageGenerator";
import WritingArea from "@/components/WritingArea";
import config from "@/config";

export default function PracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialText = searchParams.get("text") || "";

  const [text, setText] = useState("");
  const [key, setKey] = useState(0);
  const [imageId, setImageId] = useState<number | null>(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
    }
  }, [initialText]);

  const handleNewImage = () => {
    setKey((prevKey) => prevKey + 1);
    setText("");
    setImageId(null); // reset imageId
  };

  const handleSubmit = async () => {
    if (!text.trim() || imageId === null) return;

    try {
      const res = await fetch(`${config.apiBaseUrl}/api/images/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId,
          userDescription: text,
          langCode: "en", // adjust if needed
        }),
      });

      if (!res.ok) {
        console.error("Failed to submit description");
        return;
      }

      const data = await res.json();
      const submissionId = data.id;

      // ✅ Navigate with the submission ID
      router.push(`/practice/feedback?submissionId=${submissionId}`);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-2">
          Describe What You See
        </h1>
        <p className="text-base text-gray-600 text-center mb-6 max-w-3xl">
          Observe the image and craft a vivid description. Let your creativity flow—then get
          AI-powered feedback to refine it.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full mb-6 h-[420px]">
          {/* Image Section */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 rounded-2xl shadow-md overflow-hidden bg-gray-200 flex items-center justify-center">
              <ImageGenerator key={key} onImageDataChange={(image) => setImageId(image.id)} />
            </div>
            <button
              onClick={handleNewImage}
              className="px-4 py-3 bg-blue-200 rounded-xl font-semibold text-indigo-800 hover:bg-blue-300 transition-colors"
            >
              Generate New Scene
            </button>
          </div>

          {/* Writing Section */}
          <div className="flex flex-col gap-4 h-full">
            <WritingArea value={text} onChange={setText} />
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || imageId === null}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              Submit for Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
