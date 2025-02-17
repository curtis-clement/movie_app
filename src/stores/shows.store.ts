import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import api from '@/api';
import { type ShowInfoCardData, type Show } from '@/models/model';
import { RatingFilterOption } from '@/models/filter.model';
import { filterByGenre, filterByStatus, filterByRating } from '@/helpers/util';

interface State {
  searchQuery: string;
  shows: ShowInfoCardData[];
  selectedShow: Show | null;
  selectedFilterByGenre: string[];
  selectedFilterByStatus: string[];
  selectedFilterByRating: RatingFilterOption | '';
}

const initialState: State = {
  searchQuery: '',
  shows: [],
  selectedShow: null,
  selectedFilterByGenre: [],
  selectedFilterByStatus: [],
  selectedFilterByRating: '',
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
    clearAllShows(): void {
      this.shows = [];
    },
    updateSearchQuery(query: string): void {
      this.searchQuery = query;
    },
    clearSearchQuery(): void {
      this.searchQuery = '';
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
    setSelectedFilterByGenre(genre: string): void {
      if (this.selectedFilterByGenre.includes(genre)) {
        this.selectedFilterByGenre = this.selectedFilterByGenre.filter((g) => g !== genre);
      } else {
        this.selectedFilterByGenre.push(genre);
      }
    },
    clearSelectedFilterByGenre(): void {
      this.selectedFilterByGenre = [];
    },
    setSelectedFilterByStatus(status: string): void {
      if (this.selectedFilterByStatus.includes(status)) {
        this.selectedFilterByStatus = this.selectedFilterByStatus.filter((s) => s !== status);
      } else {
        this.selectedFilterByStatus.push(status);
      }
    },
    clearSelectedFilterByStatus(): void {
      this.selectedFilterByStatus = [];
    },
    setSelectedFilterByRating(rating: RatingFilterOption): void {
      this.selectedFilterByRating = rating;
    },
    clearSelectedFilterByRating(): void {
      this.selectedFilterByRating = '';
    },
    clearAllFilters(): void {
      this.clearSelectedFilterByGenre();
      this.clearSelectedFilterByStatus();
      this.clearSelectedFilterByRating();
    },
  },
  getters: {
    allCurrentShows: (state) => {
      const showsByGenre = filterByGenre(state.shows, state.selectedFilterByGenre);
      const showsByStatus = filterByStatus(showsByGenre, state.selectedFilterByStatus);
      const showsByRating = filterByRating(showsByStatus, state.selectedFilterByRating);
      return showsByRating;
    },
    allGeneresForCurrentShows: (state) => {
      const genres = new Set(state.shows.map((show) => show.genres).flat().sort());
      return Array.from(genres);
    },
  },
});
