export default function FeedbackCard({ data }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6 text-white">
        🤖 AI Feedback
      </h2>

      {/* Rating */}
      <div className="mb-6">
        <span className="text-gray-300 font-medium">⭐ Rating:</span>

        <span
          className={`ml-3 px-4 py-1 rounded-full text-black font-bold ${
            data.rating >= 7
              ? "bg-green-400"
              : data.rating >= 4
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
        >
          {data.rating}/10
        </span>
      </div>

      {/* Strengths */}
      <div className="mb-6">
        <h3 className="text-green-400 font-semibold mb-2">
          💪 Strengths
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data.strengths}
        </p>
      </div>

      {/* Weaknesses */}
      <div className="mb-6">
        <h3 className="text-yellow-400 font-semibold mb-2">
          ⚠ Weaknesses
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data.weaknesses}
        </p>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-purple-400 font-semibold mb-2">
          📈 Suggestions
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data.suggestions}
        </p>
      </div>

    </div>
  );
}