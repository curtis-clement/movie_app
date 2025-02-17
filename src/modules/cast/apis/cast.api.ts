import api from '@/core/api/main.api';
import PathBuilder from '@/core/api/utils.api';
import { Paths } from '@/core/api/paths.api';
import type { CastMember } from '@/modules/cast/models/cast.models';

const castApi = {
  getCastByShowId: async (showId: number): Promise<CastMember[]> => {
    const path = new PathBuilder().addPath(Paths.shows).addPath(showId).addPath(Paths.cast);
    return (await api.get(path.build())).data;
  },
}

export default castApi;
