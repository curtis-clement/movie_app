import api from '@/api/main.api';
import PathBuilder from '@/api/utils.api';
import { Paths } from '@/api/paths.api';
import type { Show } from '@/models/model';

const showPath = () => new PathBuilder().addPath(Paths.shows);
const searchPath = () => new PathBuilder().addPath(Paths.search).addPath(Paths.shows);

const showsApi = {
  getShowsByPageNumber: async (pageNumber: number) => {
    const path = showPath().addQuery('page', pageNumber.toString());
    return (await api.get(path.build())).data;
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
  getShowsBySearchQuery: async (query: string): Promise<{ score: number, show: Show }[]> => {
    const path = searchPath().addQuery('q', query).build();
    return (await api.get(path)).data;
  },
}

export default showsApi;
