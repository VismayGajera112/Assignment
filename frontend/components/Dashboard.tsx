import { getEventsByOrganizer } from "../services/events";
import { Card, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const getUserIdFromToken = (token: string): string => {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded?.id || "";
  } catch {
    return "";
  }
};

const decodeRole = (token: string): string => {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded?.role || "";
  } catch {
    return "";
  }
};

const Dashboard = () => {
  interface Event {
    id: string;
    name: string;
    description: string;
    capacity: number;
    type: string;
    duration: number;
    dateTime: string;
  }

  interface DashboardData {
    data: Event[];
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const organizerId = getUserIdFromToken(localStorage.getItem("token") || "");

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const role = decodeRole(localStorage.getItem("token") || "");
        if (role === "organizer") {
          const data = await getEventsByOrganizer(organizerId);
          console.log("Dashboard data:", data);
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, [organizerId]);

  if (loading) {
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
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        padding: "16px",
      }}
    >
      {/* Organizer's Events Card */}
      <Card
        style={{
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 8px", textAlign: "center" }}>Your Events</h3>
        <ul style={{ fontSize: "16px", margin: "0 0 16px" }}>
          {dashboardData &&
          dashboardData.data &&
          dashboardData.data.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Description
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Capacity
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Type
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Duration
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Date
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.data.map((event) => (
                  <tr key={event.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.description}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.capacity}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.type}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {event.duration} hours
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {new Date(event.dateTime).toLocaleDateString()}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {new Date(event.dateTime).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
