import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/interview/my");
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">📊 Interview History</h2>

      {data.length === 0 ? (
        <p className="text-gray-400">No interviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-2">
                {item.question}
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                Role: {item.role}
              </p>

              <div className="mb-2">
                <span className="font-bold">⭐ Rating:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-black font-bold ${
                    item.rating >= 7
                      ? "bg-green-400"
                      : item.rating >= 4
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                >
                  {item.rating}/10
                </span>
              </div>

              <p className="text-gray-300 text-sm">
                {item.strengths.slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}