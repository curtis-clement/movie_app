interface Rating {
  average: number;
}

interface Country {
  code: string;
  name: string;
  timezone: string;
}

interface Network {
  country: Country;
  id: number;
  name: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Show {
  ended: string;
  genres: string[];
  id: number;
  image: Image;
  language: string;
  name: string;
  network: Network;
  premiered: string;
  rating: Rating;
  runtime: number;
  schedule: {
    days: string[];
    time: string;
  };
  status: string;
  summary: string;
  url: string;
}

interface ShowInfoCardData {
  genres: string[];
  id: number;
  image: Image;
  name: string;
  network: Network;
  rating: number;
  status: string;
}

enum ShowInfoCardHeaders {
  NAME = 'Name',
  RATING = 'Rating',
  STATUS = 'Status',
  NETWORK = 'Network',
  COUNTRY = 'Country',
}

interface Season {
  endDate: string;
  episodeOrder: number;
  id: number;
  image: Image;
  network: Network;
  number: number;
  premiereDate: string;
  summary: string | null;
  url: string;
}

export type { Country, Image, Network, Rating, Season, Show, ShowInfoCardData };
export { ShowInfoCardHeaders };