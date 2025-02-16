import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import api from '@/api';
import type { ShowInfoCardData, Show } from '@/models/model';

interface State {
  searchQuery: string;
  shows: ShowInfoCardData[];
  selectedShow: Show | null;
}

const initialState: State = {
  searchQuery: '',
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
          const fetchedShows = await api.getShowsByPageNumber(currentPage);
          if (fetchedShows && fetchedShows.length > 0) {
            
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
      const show = await api.getShowById(showId);
      this.selectedShow = show;
    },
    updateSearchQuery(query: string): void {
      this.searchQuery = query;
    },
    async searchShows(): Promise<void> {
      const shows = await api.getShowsBySearchQuery(this.searchQuery);
      
      const updatedShows = shows.map((item: { score: number, show: Show }) => ({
        genres: item.show.genres ? item.show.genres : [],
        id: item.show.id,
        image: item.show.image,
        name: item.show.name,
        rating: item.show.rating && item.show.rating.average ? item.show.rating.average : 0,
        status: item.show.status,
        network: item.show.network,
      }));

      this.shows = updatedShows;
    },
  },
  getters: {
    allCurrentShows: (state) => {
      console.log('state.shows', state.shows);
      return state.shows;
    },
  },
});
