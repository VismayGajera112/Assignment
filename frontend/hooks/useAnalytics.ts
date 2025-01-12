import { useState, useEffect } from 'react';
import { getAnalytics } from '../services/analytics';

const useAnalytics = (eventId: string) => {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getAnalytics(eventId);
      setAnalytics(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchAnalytics();
  }, [eventId]);

  return { analytics, fetchAnalytics, loading, error };
};

export default useAnalytics;
