import castApi from '@/modules/cast/apis/cast.api';
import episodesApi from '@/modules/episodes/apis/episodes.api';
import showsApi from '@/modules/shows/apis/shows.api';

export default {
  ...castApi,
  ...episodesApi,
  ...showsApi,
}