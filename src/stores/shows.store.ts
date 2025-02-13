import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import showsApi from '@/api/modules/shows.api';

interface State {
  shows: [];
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
          const fetchedShows = await showsApi.getAllShows(currentPage);
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
});
