import { useState } from "react";
import Layout from "../components/Layout";
import InterviewForm from "../components/InterviewForm";
import FeedbackModal from "../components/FeedbackModal";

export default function Interview() {
  const [result, setResult] = useState(null);

  return (
    <Layout>
      <InterviewForm onResult={setResult} />

      {result && (
        <FeedbackModal
          data={result}
          onClose={() => setResult(null)}
        />
      )}
    </Layout>
  );
}