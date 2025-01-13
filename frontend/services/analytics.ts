import axios from 'axios'; // Separate instance for Python Microservice if needed

const pythonApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://127.0.0.1:5000/', // Python Microservice
  timeout: 5000,
});

export const getAnalytics = (eventId: string) => {
  return pythonApi.post(`/analytics/${eventId}`);
};

export const getSentimentAnalysis = (data: { text: string }) => {
  return pythonApi.post('/analytics/sentiment', data);
};

export const getEngagementScore = (eventId: string) => {
  return pythonApi.get(`/analytics/${eventId}/engagement`);
};

export const generatePeriodicReport = (eventId: string) => {
  return pythonApi.post(`/analytics/${eventId}/report`);
};
