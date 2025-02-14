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

interface ShowTableData {
  genres: string[];
  id: number;
  name: string;
  network: Network;
  rating: Rating;
  status: string;
}

enum ShowTableHeaders {
  NAME = 'Name',
  NETWORK = 'Network',
  RATING = 'Rating',
  STATUS = 'Status',
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

interface Episode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: Image;
  name: string;
  number: number;
  rating: Rating;
  runtime: number;
  season: number;
  summary: string | null;
  type: string;
  url: string;
}

interface CastMember {
  character: {
    id: number;
    image: Image;
    name: string;
    url: string;
  };
  person: {
    birthday: string;
    country: Country;
    deathday: string | null;
    gender: string;
    id: number;
    image: Image;
    name: string;
    url: string;
  };
  self: boolean;
  voice: boolean;
}

export type { CastMember, Episode, Season, Show, ShowTableData };
export { ShowTableHeaders };