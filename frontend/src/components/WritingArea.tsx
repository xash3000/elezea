"use client";

export default function WritingArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const wordCount = value.trim() ? value.split(/\s+/).filter((word) => word.length > 0).length : 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow p-6 text-lg text-gray-800 bg-transparent resize-none outline-none focus:ring-2 focus:ring-indigo-400 rounded-3xl transition-all duration-200 placeholder-gray-400"
        placeholder="Unleash your imagination... What story does this image tell?"
      />
      <div className="py-4 px-6 text-right text-indigo-600 font-medium border-t border-indigo-100">
        ✍️ {wordCount} {wordCount === 1 ? "word" : "words"}
      </div>
    </div>
  );
}
