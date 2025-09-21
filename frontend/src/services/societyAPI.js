import api from './api';

export const societyAPI = {
  createSociety: async (societyData) => {
    const response = await api.post('/society', societyData);
    return response.data;
  },

  getDashboard: async () => {
    const response = await api.get('/society/dashboard');
    return response.data;
  },

  addAnnouncement: async (announcementData) => {
    const response = await api.post('/society/announcements', announcementData);
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await api.get('/society/announcements');
    return response.data;
  },

  getMembersConsumption: async () => {
    const response = await api.get('/society/members/consumption');
    return response.data;
  }
};
