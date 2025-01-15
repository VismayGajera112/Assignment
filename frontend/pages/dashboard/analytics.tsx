import AnalyticsDisplay from "../../components/AnalyticsDisplay";
import Navbar from "@/components/Navbar";
import { getEventsByOrganizer } from "@/services/events";
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

const AnalyticsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userId = getUserIdFromToken(token);

          const response = await getEventsByOrganizer(userId);
          setEvents(response.data);
          if (response.data.length > 0) {
            setSelectedEvent(response.data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
  };

  return (
    <div>
      <Navbar />
      <h2>Your events</h2>
      <select
        value={selectedEvent}
        onChange={(e) => handleEventChange(e.target.value)}
        style={{ width: 200, marginBottom: 20 }}
        disabled={loading}
      >
        <option value="">None</option>
        {events.map((event: any) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
      {selectedEvent && <AnalyticsDisplay eventId={Number(selectedEvent)} />}
    </div>
  );
};

export default AnalyticsPage;
