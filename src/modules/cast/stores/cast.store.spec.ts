import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import api from '@/core/api';
import { useCastStore } from '@/modules/cast/stores/cast.store';
import type { CastMember } from '../models/cast.models';

const mockCast: CastMember[] = [
  {
    character: {
      id: 1,
      name: 'Character 1',
      image: { medium: 'image1.jpg', original: 'image1.jpg' },
      url: 'url1',
    },
    person: {
      id: 1,
      name: 'Person 1',
      image: { medium: 'image1.jpg', original: 'image1.jpg' },
      url: 'url1',
      birthday: '1990-01-01',
      country: { code: 'US', name: 'United States', timezone: 'America/New_York' },
      deathday: null,
      gender: 'Male',
    },
    self: false,
    voice: false,
  },
];

vi.mock('@/core/api', () => ({
  default: {
    getCastByShowId: vi.fn(),
  },
}));

describe('Cast Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('fetchCastByShowId', () => {
    it('should fetch cast members and update the store', async () => {
      const store = useCastStore();

      vi.mocked(api.getCastByShowId).mockResolvedValue(mockCast);

      expect(store.isCastLoading).toBe(true);
      expect(store.selectedShowCast).toHaveLength(0);

      await store.fetchCastByShowId(1);

      expect(api.getCastByShowId).toHaveBeenCalledWith(1);
      expect(api.getCastByShowId).toHaveBeenCalledTimes(1);
      expect(store.selectedShowCast).toEqual(mockCast);
      expect(store.isCastLoading).toBe(false);
    });

    it('should handle API errors correctly', async () => {
      const store = useCastStore();
      const error = new Error('API Error');

      vi.mocked(api.getCastByShowId).mockRejectedValue(error);

      await expect(store.fetchCastByShowId(1)).rejects.toThrow('API Error');
      expect(store.isCastLoading).toBe(true);
    });
  });

  describe('clearSelectedShowCast', () => {
    it('should clear the selected show cast', () => {
      const store = useCastStore();
      
      store.selectedShowCast = mockCast;
      store.clearSelectedShowCast();
      expect(store.selectedShowCast).toHaveLength(0);
    });
  });
});