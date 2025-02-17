import { RatingFilterOption } from '@/models/filter.model';
import type { ShowInfoCardData } from '@/modules/shows/models/shows.model';

function filterByGenre(shows: ShowInfoCardData[], genres: string[]): ShowInfoCardData[] {
  if (genres.length === 0) {
    return shows;
  }
  return shows.filter((show) => show.genres.some((genre) => genres.includes(genre)));
}

function filterByStatus(shows: ShowInfoCardData[], statuses: string[]): ShowInfoCardData[] {
  if (statuses.length === 0) {
    return shows;
  }
  return shows.filter((show) => statuses.includes(show.status));
}

function filterByRating(shows: ShowInfoCardData[], ratingOption: RatingFilterOption | ''): ShowInfoCardData[] {
  if (ratingOption === '') {
    return shows;
  }

  const sortedShows = [...shows];
  return sortedShows.sort((a, b) => {
    const multiplier = ratingOption === RatingFilterOption.HIGHEST ? -1 : 1;
    const ratingDiff = (a.rating || 0) - (b.rating || 0);
    return ratingDiff === 0 ? a.id - b.id : multiplier * ratingDiff;
  });
}

export { filterByGenre, filterByStatus, filterByRating };
