import castApi from '@/api/modules/cast.api';
import episodesApi from '@/api/modules/episodes.api';
import searchApi from '@/api/modules/search.api';
import showsApi from '@/api/modules/shows.api';

export default {
  ...castApi,
  ...episodesApi,
  ...searchApi,
  ...showsApi,
}