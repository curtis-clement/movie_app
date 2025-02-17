import api from '@/core/api/main.api';
import PathBuilder from '@/core/api/utils.api';
import { Paths } from '@/core/api/paths.api';
import type { Episode } from '@/modules/shows/models/shows.model';

const episodesApi = {
  getEpisodeListBySeasonId: async (seasonId: number): Promise<Episode[]> => {
    const path = new PathBuilder().addPath(Paths.seasons).addPath(seasonId).addPath(Paths.episodes);
    return (await api.get(path.build())).data;
  },
  getEpisodeById: async (episodeId: number): Promise<Episode> => {
    const path = new PathBuilder().addPath(Paths.episodes).addPath(episodeId);
    return (await api.get(path.build())).data;
  },
}

export default episodesApi;