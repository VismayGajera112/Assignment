import AnalyticsDisplay from '../../components/AnalyticsDisplay';

const AnalyticsPage = () => {
  const eventId = 'some-event-id'; // Replace with actual eventId fetched dynamically or via query parameters.

  return (
    <div style={{ padding: '20px' }}>
      <AnalyticsDisplay eventId={eventId} />
    </div>
  );
};

export default AnalyticsPage;
