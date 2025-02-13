import api from '@/api/main.api';

const castApi = {
  getCastByShowId: async (showId: number) => {
    const response = await api.get(`/shows/${showId}/cast`);
    return response.data;
  },
}

export default castApi;
