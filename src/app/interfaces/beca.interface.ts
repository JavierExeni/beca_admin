import { City } from './city.interface';
import { University } from './university.interface';
import { User } from './user.interface';

export type Beca = {
  id: number;
  name: string;
  degree: string;
  begin: string;
  duration_per_days: number;
  city: City;
  collage: University;
  is_active: boolean;
  follow: User[];
};

export type BecaRequest = Omit<Beca, 'id' | 'city' | 'collage'> & {
  city_id: number;
  collage_id: number;
  follow: number[];
};
