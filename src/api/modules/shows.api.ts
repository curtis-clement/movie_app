import api from '@/api/main.api';
import PathBuilder from '@/api/utils.api';
import { Paths } from '@/api/paths.api';
import type { Show } from '@/models/model';

const showPath = () => new PathBuilder().addPath(Paths.shows);
const searchPath = () => new PathBuilder().addPath(Paths.search).addPath(Paths.shows);

const showsApi = {
  getShowsByPageNumber: async (pageNumber: number) => {
    const response = await api.get(`/shows?page=${pageNumber}`);
    return response.data;
  },
  getShowById: async (showId: number) => {
    const path = showPath().addPath(showId);
    return (await api.get(path.build())).data;
  },
  getEpisodeListByShowId: async (showId: number) => {
    const path = showPath().addPath(showId.toString()).addPath(Paths.episodes);
    return (await api.get(path.build())).data;
  },
  getSeasonsByShowId: async (showId: number) => {
    const path = showPath().addPath(showId).addPath(Paths.seasons);
    return (await api.get(path.build())).data;
  },
  getShowsBySearchQuery: async (query: string): Promise<Show[]> => {
    const path = searchPath().addQuery('q', query).build();
    console.log('path', path);
    return (await api.get(path)).data;
  },
}

export default showsApi;
