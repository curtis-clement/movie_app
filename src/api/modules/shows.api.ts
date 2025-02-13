import api from '@/api/main.api';

const showsApi = {
  getAllShows: async (pageNumber: number) => {
    const response = await api.get(`/shows?page=${pageNumber}`);
    return response.data;
  },
  getShowById: async (showId: number) => {
    const response = await api.get(`/shows/${showId}`);
    console.log('RESPONSE', response.data);
    return response.data;
  },
}

export default showsApi;
