import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import showsApi from '@/api/modules/shows.api';
import type { ShowInfoCardData, Show } from '@/models/model';

interface State {
  shows: ShowInfoCardData[];
  selectedShow: Show | null;
}

const initialState: State = {
  shows: [],
  selectedShow: null,
}

export const useShowsStore = defineStore('shows', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    async fetchAllShows(): Promise<void> {
      const pagesToFetch = 5;
      
      for (let currentPage = 1; currentPage < pagesToFetch; currentPage++) {
        try {
          const fetchedShows = await showsApi.getShowsByPageNumber(currentPage);
          if (fetchedShows && fetchedShows.length > 0) {
            console.log('fetchedShows', fetchedShows);
            const shows = fetchedShows.map((show: Show) => ({
              genres: show.genres,
              id: show.id,
              image: show.image,
              name: show.name,
              rating: show.rating.average,
              status: show.status,
              network: show.network,
            }));

            this.shows.push(...shows);
          } else {
            console.log('No more shows available');
            break;
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError && error.response?.status === 404) {
            break;
          } else {
            console.error('Error fetching shows:', error);
            break;
          }
        }
      }
    },
    async fetchShowById(showId: number): Promise<void> {
      const show = await showsApi.getShowById(showId);
      this.selectedShow = show;
    },
  },
  getters: {
    allCurrentShows: (state) => {
      return state.shows;
    },
  },
});
