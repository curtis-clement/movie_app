import api from '@/api/main.api';
import type { Show } from '@/models/model';

const searchApi = {
  searchShows: async (query: string): Promise<Show[]> => {
    const response = await api.get(`/search/shows?q=${query}`);
    return response.data;
  },
}

export default searchApi;