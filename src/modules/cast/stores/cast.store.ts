import { defineStore } from 'pinia';
import api from '@/core/api';
import type { CastMember } from '@/modules/cast/models/cast.models';

interface State {
  selectedShowCast: CastMember[];
  isCastLoading: boolean;
}

const initialState: State = {
  selectedShowCast: [],
  isCastLoading: false,
}

export const useCastStore = defineStore('cast', {
  state: () => ({
    ...initialState,
  }),
  actions: {
    async fetchCastByShowId(showId: number): Promise<void> {
      console.log('FETCHING CAST');
      this.isCastLoading = true;
      const cast = await api.getCastByShowId(showId);
      this.selectedShowCast = cast;
      this.isCastLoading = false;
    },
    clearSelectedShowCast(): void {
      this.selectedShowCast = [];
    },
  },
});
