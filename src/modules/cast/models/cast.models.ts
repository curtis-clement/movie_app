import type { Country, Image } from '@/modules/shows/models/shows.model';

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

export type { CastMember };
