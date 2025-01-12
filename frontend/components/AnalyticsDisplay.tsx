import { useEffect, useState } from 'react';
import { Card, Progress, Spacer, Spinner } from '@nextui-org/react';
import { getAnalytics } from '../services/analytics';
import '../../styles/globals.css';

const AnalyticsDisplay = ({ eventId }: { eventId: string }) => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await getAnalytics(eventId);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      }
    };

    getAnalyticsData();
  }, [eventId]);

  if (!analytics)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="lg" />
      </div>
    );

  return (
    <div style={{ display: 'grid', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
      {/* Attendance Card */}
      <Card style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: 0 }}>Attendance</h3>
        <p style={{ fontSize: '16px', margin: '8px 0' }}>{analytics.attendance}</p>
        <Progress value={(analytics.attendance / 1000) * 100} color="success" size="lg" />
      </Card>

      {/* Engagement Card */}
      <Card style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: 0 }}>Engagement</h3>
        <p style={{ fontSize: '16px', margin: '8px 0' }}>{analytics.engagement}</p>
        <Progress value={(analytics.engagement / 100) * 100} color="primary" size="lg" />
      </Card>
    </div>
  );
};

export default AnalyticsDisplay;
