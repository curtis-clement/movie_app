import api from '@/api/main.api';

const episodesApi = {
  getEpisodeListByShowId: async (showId: number) => {
    const response = await api.get(`/shows/${showId}/episodes`);
    return response.data;
  },
  getSeasonsByShowId: async (showId: number) => {
    const response = await api.get(`/shows/${showId}/seasons`);
    return response.data;
  },
  getEpisodeListBySeasonId: async (seasonId: number) => {
    const response = await api.get(`/seasons/${seasonId}/episodes`);
    return response.data;
  },
}

export default episodesApi;