import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function InterviewForm({ onResult }) {
  const [role, setRole] = useState("React Developer");
  const [question, setQuestion] = useState("Explain useEffect");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // default 2 min
  const [difficulty, setDifficulty] = useState("Medium");

  const recognitionRef = useRef(null);

  // 🎯 Difficulty Timer Setup
  useEffect(() => {
    if (difficulty === "Easy") setTimeLeft(180);
    if (difficulty === "Medium") setTimeLeft(120);
    if (difficulty === "Hard") setTimeLeft(60);
  }, [difficulty]);

  // ⏱ Timer Countdown
  useEffect(() => {
    if (!examStarted) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, examStarted]);

  // 🎤 Start Recording
  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswer((prev) => prev + " " + transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  // 🔄 Generate Question
  const generateNewQuestion = async () => {
    try {
      const res = await API.post("/interview/generate-question", { role });
      setQuestion(res.data.question);
      resetExam();
    } catch (err) {
      toast.error("Failed to generate question"+err);
    }
  };

  // 🚀 Submit
  const handleSubmit = async (auto = false) => {
    if (!answer.trim() && !auto)
      return toast.error("Please enter your answer");

    try {
      setLoading(true);

      const res = await API.post("/interview/create", {
        role,
        question,
        answer,
      });

      setExamStarted(false);
      onResult(res.data);
      setAnswer("");
    } catch (error) {
      toast.error("Something went wrong"+error);
    } finally {
      setLoading(false);
    }
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const resetExam = () => {
    setExamStarted(false);
    if (difficulty === "Easy") setTimeLeft(180);
    if (difficulty === "Medium") setTimeLeft(120);
    if (difficulty === "Hard") setTimeLeft(60);
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-white">
        🧪 Exam Mode Interview
      </h2>

      {/* Role */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm">Role</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 mt-1"
        />
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 mt-1"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Timer */}
      {examStarted && (
        <div className="flex justify-end mb-4">
          <div
            className={`px-4 py-2 rounded-lg font-bold ${
              timeLeft <= 30
                ? "bg-red-600 animate-pulse"
                : "bg-blue-600"
            }`}
          >
            ⏱ {formatTime()}
          </div>
        </div>
      )}

      {/* Question */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-300 text-sm">Question</p>
          <button
            onClick={generateNewQuestion}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm rounded-lg"
          >
            🔄 New Question
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg text-white">
          {question}
        </div>
      </div>

      {/* Answer */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="6"
        disabled={!examStarted}
        placeholder="Type or speak your answer..."
        className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
      />

      {/* Voice */}
      {examStarted && (
        <div className="flex gap-4 mb-6">
          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              🎤 Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              🛑 Stop Recording
            </button>
          )}
        </div>
      )}

      {/* Controls */}
      {!examStarted ? (
        <button
          onClick={startExam}
          className="w-full py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700"
        >
          ▶ Start Exam
        </button>
      ) : (
        <button
          onClick={() => handleSubmit(false)}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600"
          }`}
        >
          {loading ? "Evaluating..." : "Submit Answer"}
        </button>
      )}
    </div>
  );
}