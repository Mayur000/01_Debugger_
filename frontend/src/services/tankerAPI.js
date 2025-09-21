import api from './api';

export const tankerAPI = {
  getTankers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/tankers?${params}`);
    return response.data;
  },

  bookTanker: async (bookingData) => {
    const response = await api.post('/tankers/book', bookingData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/tankers/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.patch(`/tankers/orders/${orderId}/status`, { status });
    return response.data;
  },

  reviewOrder: async (orderId, reviewData) => {
    const response = await api.post(`/tankers/orders/${orderId}/review`, reviewData);
    return response.data;
  },

  deleteOrder: async (orderId) => {
    const response = await api.delete(`/tankers/orders/${orderId}`);
    return response.data;
  }
};
