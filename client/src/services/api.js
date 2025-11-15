const API_URL = 'http://localhost:3000';

export const api = {
  // Live Events
  async getLiveEvents() {
    const response = await fetch(`${API_URL}/liveEvents`);
    if (!response.ok) throw new Error('Failed to fetch live events');
    return response.json();
  },

  async getLiveEvent(id) {
    const response = await fetch(`${API_URL}/liveEvents/${id}`);
    if (!response.ok) throw new Error('Failed to fetch live event');
    return response.json();
  },

};

