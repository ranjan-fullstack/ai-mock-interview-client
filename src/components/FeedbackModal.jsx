export default function FeedbackModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>

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
          <p className="text-gray-300 whitespace-pre-line">
            {data.strengths}
          </p>
        </div>

        {/* Weaknesses */}
        <div className="mb-6">
          <h3 className="text-yellow-400 font-semibold mb-2">
            ⚠ Weaknesses
          </h3>
          <p className="text-gray-300 whitespace-pre-line">
            {data.weaknesses}
          </p>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="text-purple-400 font-semibold mb-2">
            📈 Suggestions
          </h3>
          <p className="text-gray-300 whitespace-pre-line">
            {data.suggestions}
          </p>
        </div>

      </div>
    </div>
  );
}