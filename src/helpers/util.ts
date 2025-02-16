import { RatingFilterOption } from '@/models/filter.model';
import type { ShowInfoCardData } from '@/models/model';

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
  if (ratingOption === RatingFilterOption.HIGHEST) {
    return shows.sort((a, b) => b.rating - a.rating);
  } else {
    return shows.sort((a, b) => a.rating - b.rating);
  }
}

export { filterByGenre, filterByStatus, filterByRating };
