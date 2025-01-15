import { getAnalytics } from "../services/analytics";
import { Card, Progress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDisplay = ({ eventId }: { eventId: number }) => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await getAnalytics(eventId);
        console.log("Analytics : ", response.data);
        setAnalytics(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };

    getAnalyticsData();
  }, [eventId]);

  const data = {
    labels: [
      "Messages",
      "Engagement",
      "Questions",
      "Reactions",
      "Avg Time Spent",
      "Sentiment Score",
    ],
    datasets: [
      {
        label: "Analytics Data",
        data: analytics
          ? [
              analytics.message_count,
              analytics.engagement,
              analytics.question_count,
              analytics.reaction_count,
              analytics.avg_time_spent,
              analytics.sentiment_score,
            ]
          : [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!analytics)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner size="lg" />
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ margin: 0 }}>Messages</h3>
          <p style={{ fontSize: "16px", margin: "8px 0" }}>
            {analytics.message_count}
          </p>
          <Progress
            value={(analytics.message_count / 1000) * 100}
            color="success"
            size="lg"
          />
        </Card>

        <Card
          style={{
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ margin: 0 }}>Engagement</h3>
          <p style={{ fontSize: "16px", margin: "8px 0" }}>
            {analytics.engagement}
          </p>
          <Progress
            value={(analytics.engagement / 100) * 100}
            color="primary"
            size="lg"
          />
        </Card>

        <div style={{ width: "100%", height: "400px" }}>
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDisplay;
