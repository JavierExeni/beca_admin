import { Country } from './country.interface';

export type City = {
  id: number;
  name: string;
  code: string;
  country: Country;
};

export type CityRequest = Omit<City, 'id' | 'country'> & {
  country_id: number;
};
