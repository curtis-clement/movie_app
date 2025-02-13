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
  getEpisodeById: async (episodeId: number) => {
    const response = await api.get(`/episodes/${episodeId}`);
    return response.data;
  },
}

export default episodesApi;