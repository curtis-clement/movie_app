import { describe, it, expect } from 'vitest';
import { filterByGenre, filterByStatus, filterByRating } from '@/helpers/util';
import { RatingFilterOption } from '@/models/filter.model';
import type { ShowInfoCardData } from '@/models/shows.model';

const mockShows: ShowInfoCardData[] = [
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
    const result = filterByGenre(mockShows, []);
    expect(result).toEqual(mockShows);
  });

  it('filters shows by a single genre', () => {
    const result = filterByGenre(mockShows, ['Comedy']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 3]);
  });

  it('filters shows by multiple genres', () => {
    const result = filterByGenre(mockShows, ['Action', 'Drama']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 2]);
  });

  it('returns empty array when no shows match the genres', () => {
    const result = filterByGenre(mockShows, ['Horror']);
    expect(result).toHaveLength(0);
  });
});

describe('filterByStatus', () => {
  it('returns all shows when no statuses are provided', () => {
    const result = filterByStatus(mockShows, []);
    expect(result).toEqual(mockShows);
  });

  it('filters shows by a single status', () => {
    const result = filterByStatus(mockShows, ['Running']);
    expect(result).toHaveLength(2);
    expect(result.map(show => show.id)).toEqual([1, 3]);
  });

  it('filters shows by multiple statuses', () => {
    const result = filterByStatus(mockShows, ['Running', 'Ended']);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.id)).toEqual([1, 2, 3]);
  });

  it('returns empty array when no shows match the status', () => {
    const result = filterByStatus(mockShows, ['Cancelled']);
    expect(result).toHaveLength(0);
  });
});

describe('filterByRating', () => {
  it('returns original shows array when no rating option is provided', () => {
    const result = filterByRating(mockShows, '');
    expect(result).toEqual(mockShows);
  });

  it('sorts shows by highest rating when HIGHEST option is selected', () => {
    const result = filterByRating(mockShows, RatingFilterOption.HIGHEST);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.rating)).toEqual([9.0, 8.5, 7.5]);
  });

  it('sorts shows by lowest rating when LOWEST option is selected', () => {
    const result = filterByRating(mockShows, RatingFilterOption.LOWEST);
    expect(result).toHaveLength(3);
    expect(result.map(show => show.rating)).toEqual([7.5, 8.5, 9.0]);
  });
});