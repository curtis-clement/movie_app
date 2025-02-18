import api from '@/core/api';
import { defineStore } from 'pinia';
import type { Episode } from '@/modules/episodes/models/episodes.model';

interface State {
  episodes: Episode[];
  areEpisodesLoading: boolean;
}

const initialState: State = {
  episodes: [],
  areEpisodesLoading: true,
}

export const useEpisodesStore = defineStore('episodes', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    async fetchEpisodesByShowId(showId: number): Promise<void> {
      this.areEpisodesLoading = true;
      const episodes = await api.getShowEpisodes(showId);
      this.episodes = episodes;
      this.areEpisodesLoading = false;
    },
    clearEpisodes(): void {
      this.episodes = [];
    },
  },
});