import api from './api';

export const readingsAPI = {
  addReading: async (readingData) => {
    const response = await api.post('/readings', readingData);
    return response.data;
  },

  getReadings: async (period = '30') => {
    const response = await api.get(`/readings?period=${period}`);
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/readings/analytics');
    return response.data;
  }
};