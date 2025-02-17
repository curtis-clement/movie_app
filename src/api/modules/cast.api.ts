import api from '@/api/main.api';
import PathBuilder from '@/api/utils.api';
import { Paths } from '@/api/paths.api';
import type { CastMember } from '@/models/shows.model';

const castApi = {
  getCastByShowId: async (showId: number): Promise<CastMember[]> => {
    const path = new PathBuilder().addPath(Paths.shows).addPath(showId).addPath(Paths.cast);
    return (await api.get(path.build())).data;
  },
}

export default castApi;
