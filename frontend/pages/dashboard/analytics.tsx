import AnalyticsDisplay from '../../components/AnalyticsDisplay';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getEventsByOrganizer } from '@/services/events';

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
  const organizerId = getUserIdFromToken(localStorage.getItem('token') || '');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventsByOrganizer(organizerId);
        setEvents(response.data);
        if (response.data.length > 0) {
          setSelectedEvent(response.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizerId]);

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
  };

  console.log(selectedEvent);

  return (
    <div>
      <Navbar />
      <select
        value={selectedEvent}
        onChange={(e) => handleEventChange(e.target.value)}
        style={{ width: 200, marginBottom: 20 }}
        disabled={loading}
      >
        {events.map((event: any) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
      <AnalyticsDisplay eventId={selectedEvent} />
    </div>
  );
};

export default AnalyticsPage;
