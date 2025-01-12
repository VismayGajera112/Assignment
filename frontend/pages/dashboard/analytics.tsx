import api from '@/services/api';
import AnalyticsDisplay from '../../components/AnalyticsDisplay';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AnalyticsPage = () => {
  const router = useRouter();
  const eventId = "";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
      const response = await api.get('/events');
      setEvents(response.data);
      } catch (error) {
      console.error('Failed to fetch events', error);
      } finally {
      setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <AnalyticsDisplay eventId={eventId} />
    </div>
  );
};

export default AnalyticsPage;
