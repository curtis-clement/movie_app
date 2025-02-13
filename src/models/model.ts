type Network = {
  id: number;
  name: string;
  country: {
    code: string;
    name: string;
    timezone: string;
  };
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
  rating: {
    average: number;
  };
  runtime: number;
  schedule: {
    time: string;
    days: string[];
  };
  status: string;
  summary: string;
  url: string;
}

interface Season {
  id: number;
  url: string,
  number: number,
  episodeOrder: number,
  premiereDate: string,
  endDate: string,
  network: Network,
  image: Image,
  summary: string | null,
}

interface Episode {

}

export type { Show, Season };