import type { Image, Rating } from '@/modules/shows/models/shows.model';

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

export type { Episode };