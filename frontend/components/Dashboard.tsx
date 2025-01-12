import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from '@nextui-org/react';
import { getEvents } from '../services/events';
import '../../styles/globals.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const data = await getEvents();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', padding: '16px' }}>
      {/* Upcoming Events Card */}
      <Card style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 8px' }}>Upcoming Events</h3>
        <p style={{ fontSize: '16px', margin: '0 0 16px' }}>{dashboardData?.upcomingEvents || 'No data available'}</p>
        <Button color="primary" style={{ width: '100%' }}>
          View All
        </Button>
      </Card>

      {/* Recent Activity Card */}
      <Card style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 8px' }}>Recent Activity</h3>
        <p style={{ fontSize: '16px', margin: '0' }}>{dashboardData?.recentActivity || 'No recent activity'}</p>
      </Card>
    </div>
  );
};

export default Dashboard;
