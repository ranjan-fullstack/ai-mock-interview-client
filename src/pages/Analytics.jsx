import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/interview/my");
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data.length) {
    return (
      <Layout>
        <p className="text-white">No interview data available.</p>
      </Layout>
    );
  }

  // 📊 Calculations
  const total = data.length;
  const avg =
    (data.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1);
  const highest = Math.max(...data.map((item) => item.rating));
  const lowest = Math.min(...data.map((item) => item.rating));

  const lineData = data.map((item, index) => ({
    name: `#${index + 1}`,
    score: item.rating,
  }));

  const difficultyData = ["Easy", "Medium", "Hard"].map((level) => {
    const filtered = data.filter((d) => d.difficulty === level);
    const avgScore = filtered.length
      ? (
          filtered.reduce((sum, d) => sum + d.rating, 0) / filtered.length
        ).toFixed(1)
      : 0;

    return { difficulty: level, score: Number(avgScore) };
  });

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-white mb-8">
        📈 Performance Analytics
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Interviews" value={total} />
        <StatCard title="Average Score" value={avg} />
        <StatCard title="Highest Score" value={highest} />
        <StatCard title="Lowest Score" value={lowest} />
      </div>

      {/* Line Chart */}
      <div className="bg-white/10 p-6 rounded-2xl mb-10">
        <h3 className="text-white mb-4 font-semibold">
          📈 Score Progress Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#a855f7" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white/10 p-6 rounded-2xl mb-10">
        <h3 className="text-white mb-4 font-semibold">
          📊 Difficulty Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={difficultyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="difficulty" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="score" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <div className="bg-purple-600/20 border border-purple-500 p-6 rounded-2xl text-white">
        💡 Insight: Your average performance is <b>{avg}/10</b>. 
        {avg >= 7
          ? " You're performing strongly. Keep pushing toward consistency."
          : " Focus on improving weak areas and practicing structured answers."}
      </div>
    </Layout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl text-center">
      <h4 className="text-gray-300 text-sm mb-2">{title}</h4>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}