import castApi from '@/api/modules/cast.api';
import episodesApi from '@/api/modules/episodes.api';
import showsApi from '@/api/modules/shows.api';

export default {
  ...castApi,
  ...episodesApi,
  ...showsApi,
}