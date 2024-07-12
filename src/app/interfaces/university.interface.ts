import { UNIVERSITY_TYPE } from "../shared/enum";
import { City } from "./city.interface";

export type University = {
  id: number;
  name: string;
  web_site: string;
  type: UNIVERSITY_TYPE;
  google_map_code: string;
  city: City;
};

export type UniversityRequest = Omit<University, 'id' | 'city'> & {
  city_id: number;
};
