import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import showsApi from '@/api/modules/shows.api';
import type { ShowTableData } from '@/models/model';

interface State {
  shows: ShowTableData[];
}

const initialState: State = {
  shows: [],
}

export const useShowsStore = defineStore('shows', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    async fetchAllShows(): Promise<void> {
      const pagesToFetch = 5;
      
      for (let currentPage = 0; currentPage < pagesToFetch; currentPage++) {
        try {
          const fetchedShows = await showsApi.getShowsByPageNumber(currentPage);
          if (fetchedShows && fetchedShows.length > 0) {
            this.shows.push(...fetchedShows);
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
  },
  getters: {
    showTableData: (state) => {
      return state.shows.slice(0, 1000).map((show) => ({
        genres: show.genres,
        id: show.id,
        name: show.name,
        rating: show.rating,
        status: show.status,
        network: show.network,
      }));
    },
  },
});
