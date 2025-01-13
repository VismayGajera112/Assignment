import { getAnalytics } from "../services/analytics";
import { Card, Progress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import "../styles/globals.css";

const AnalyticsDisplay = ({ eventId }: { eventId: string }) => {
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
      <Card
        style={{
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ margin: 0 }}>Questions</h3>
        <p style={{ fontSize: "16px", margin: "8px 0" }}>
          {analytics.question_count}
        </p>
        <Progress
          value={(analytics.question_count / 100) * 100}
          color="secondary"
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
        <h3 style={{ margin: 0 }}>Reactions</h3>
        <p style={{ fontSize: "16px", margin: "8px 0" }}>
          {analytics.reaction_count}
        </p>
        <Progress
          value={(analytics.reaction_count / 100) * 100}
          color="warning"
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
        <h3 style={{ margin: 0 }}>Average Time Spent</h3>
        <p style={{ fontSize: "16px", margin: "8px 0" }}>
          {analytics.avg_time_spent} minutes
        </p>
        <Progress
          value={(analytics.avg_time_spent / 60) * 100}
          color="danger"
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
        <h3 style={{ margin: 0 }}>Sentiment Score</h3>
        <p style={{ fontSize: "16px", margin: "8px 0" }}>
          {analytics.sentiment_score}
        </p>
        <Progress
          value={(analytics.sentiment_score / 10) * 100}
          color="success"
          size="lg"
        />
      </Card>
    </div>
  );
};

export default AnalyticsDisplay;
