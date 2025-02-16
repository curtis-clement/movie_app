enum FilterCategories {
  GENRE = 'Genre',
  RATING = 'Rating',
  STATUS = 'Status',
}

enum RatingFilterOption {
  HIGHEST = 'Highest',
  LOWEST = 'Lowest',
}

enum ShowStatusFilterOption {
  ENDED = 'Ended',
  RUNNING = 'Running',
  TO_BE_DETERMINED = 'To Be Determined',
}

interface FilterOption {
  filterName: string;
  options: string[];
  selectedOptions: string[];
}

export { FilterCategories, RatingFilterOption, ShowStatusFilterOption };
export type { FilterOption };