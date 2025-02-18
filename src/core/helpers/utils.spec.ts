import { describe, it, expect } from 'vitest';
import { convertShowDataForCardDisplay, filterByGenre, filterByStatus, filterByRating } from '@/core/helpers/utils';
import { RatingFilterOption } from '@/core/models/filter.model';
import type { Show, ShowInfoCardData } from '@/modules/shows/models/shows.model';

const mockedSingleShow: Show = {
  id: 1,
  name: 'Show 1',
  genres: ['Drama', 'Comedy'],
  rating: { average: 8.5 },
  status: 'Running',
  image: { medium: '', original: '' },
  language: 'English',
  network: {
    id: 1,
    name: 'Network 1',
    country: {
      code: 'US',
      name: 'United States',
      timezone: 'America/New_York'
    }
  },
  premiered: '2024-01-01',
  runtime: 60,
  schedule: {
    days: ['Monday'],
    time: '20:00'
  },
  ended: '2024-01-01',
  summary: 'Summary 1',
  url: 'https://example.com/show1'
};

const mockedShowsForCards: ShowInfoCardData[] = [
  {
    id: 1,
    name: 'Show 1',
    genres: ['Drama', 'Comedy'],
    rating: 8.5,
    status: 'Running',
    image: { medium: '', original: '' },
    network: {
      id: 1,
      name: 'Network 1',
      country: {
        code: 'US',
        name: 'United States',
        timezone: 'America/New_York'
      }
    }
  },
  {
    id: 2,
    name: 'Show 2',
    genres: ['Action', 'Thriller'],
    rating: 7.5,
    status: 'Ended',
    image: { medium: '', original: '' },
    network: {
      id: 2,
      name: 'Network 2',
      country: {
        code: 'US',
        name: 'United States',
        timezone: 'America/New_York'
      }
    }
  },
  {
    id: 3,
    name: 'Show 3',
    genres: ['Comedy'],
    rating: 9.0,
    status: 'Running',
    image: { medium: '', original: '' },
    network: {
      id: 3,
      name: 'Network 3',
      country: {
        code: 'US',
        name: 'United States',
        timezone: 'America/New_York'
      }
    }
  }
];

describe('filterByGenre', () => {
  it('returns all shows when no genres are provided', () => {
    const result = filterByGenre(mockedShowsForCards, []);
    expect(result).toEqual(mockedShowsForCards);
  });

  it('filters shows by a single genre', () => {
    const result = filterByGenre(mockedShowsForCards, ['Comedy']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 3]);
  });

  it('filters shows by multiple genres', () => {
    const result = filterByGenre(mockedShowsForCards, ['Action', 'Drama']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 2]);
  });

  it('returns empty array when no shows match the genres', () => {
    const result = filterByGenre(mockedShowsForCards, ['Horror']);
    expect(result).toHaveLength(0);
  });
});

describe('filterByStatus', () => {
  it('returns all shows when no statuses are provided', () => {
    const result = filterByStatus(mockedShowsForCards, []);
    expect(result).toEqual(mockedShowsForCards);
  });

  it('filters shows by a single status', () => {
    const result = filterByStatus(mockedShowsForCards, ['Running']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 3]);
  });

  it('filters shows by multiple statuses', () => {
    const result = filterByStatus(mockedShowsForCards, ['Running', 'Ended']);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.id)).toEqual([1, 2, 3]);
  });

  it('returns empty array when no shows match the status', () => {
    const result = filterByStatus(mockedShowsForCards, ['Cancelled']);
    expect(result).toHaveLength(0);
  });
});

describe('filterByRating', () => {
  it('returns original shows array when no rating option is provided', () => {
    const result = filterByRating(mockedShowsForCards, '');
    expect(result).toEqual(mockedShowsForCards);
  });

  it('sorts shows by highest rating when HIGHEST option is selected', () => {
    const result = filterByRating(mockedShowsForCards, RatingFilterOption.HIGHEST);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.rating)).toEqual([9.0, 8.5, 7.5]);
  });

  it('sorts shows by lowest rating when LOWEST option is selected', () => {
    const result = filterByRating(mockedShowsForCards, RatingFilterOption.LOWEST);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.rating)).toEqual([7.5, 8.5, 9.0]);
  });

  describe('convertShowDataForCardDisplay', () => {
    it('returns a ShowInfoCardData object with the correct properties', () => {
      const result = convertShowDataForCardDisplay(mockedSingleShow);
      expect(result).toEqual(mockedShowsForCards[0]);
    });
  });
});