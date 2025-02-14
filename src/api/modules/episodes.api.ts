import api from '@/api/main.api';
import PathBuilder from '@/api/utils.api';
import { Paths } from '@/api/paths.api';
import type { Episode } from '@/models/model';

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