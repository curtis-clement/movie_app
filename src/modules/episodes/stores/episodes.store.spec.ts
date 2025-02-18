import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useEpisodesStore } from '@/modules/episodes/stores/episodes.store';
import api from '@/core/api';
import type { Episode } from '@/modules/episodes/models/episodes.model';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Episode 1',
    airdate: '2024-01-01',
    airstamp: '2024-01-01T00:00:00Z',
    airtime: '00:00',
    image: { medium: '', original: '' },
    number: 1,
    rating: { average: 8.5 },
    runtime: 60,
    season: 1,
    summary: 'This is episode 1 summary',
    type: 'regular',
    url: 'http://example.com/episode1'
  },
  {
    id: 2,
    name: 'Episode 2',
    airdate: '2024-01-08',
    airstamp: '2024-01-08T00:00:00Z',
    airtime: '00:00',
    image: { medium: '', original: '' },
    number: 2,
    rating: { average: 8.7 },
    runtime: 60,
    season: 1,
    summary: 'This is episode 2 summary',
    type: 'regular',
    url: 'http://example.com/episode2'
  }
];

vi.mock('@/core/api', () => ({
  default: {
    getShowEpisodes: vi.fn(),
  },
}));

describe('Episodes Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have empty episodes array', () => {
      const store = useEpisodesStore();
      expect(store.episodes).toEqual([]);
    });

    it('should have areEpisodesLoading set to true', () => {
      const store = useEpisodesStore();
      expect(store.areEpisodesLoading).toBe(true);
    });
  });

  describe('actions', () => {
    it('fetchEpisodesByShowId should fetch episodes and update state', async () => {
      vi.mocked(api.getShowEpisodes).mockResolvedValue(mockEpisodes);

      const store = useEpisodesStore();
      await store.fetchEpisodesByShowId(1);

      expect(api.getShowEpisodes).toHaveBeenCalledWith(1);
      expect(store.episodes).toEqual(mockEpisodes);
      expect(store.areEpisodesLoading).toBe(false);
    });

    it('should set loading state correctly during fetch', async () => {
      const store = useEpisodesStore();
      const promise = store.fetchEpisodesByShowId(1);
      
      expect(store.areEpisodesLoading).toBe(true);
      await promise;
      expect(store.areEpisodesLoading).toBe(false);
    });

    it('clearEpisodes should clear episodes array', () => {
      const store = useEpisodesStore();
      store.episodes = mockEpisodes;
      
      store.clearEpisodes();
      
      expect(store.episodes).toEqual([]);
    });
  });
});