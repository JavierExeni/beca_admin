import { Language } from "./language.interface";

export type Country = {
  id: number;
  name: string;
  code: string;
  svg_flag: string;
  language: Language;
};

export type CountryRequest = Omit<Country, 'id' | 'svg_flag'> & {
  svg_flag: File;
  language?: number;
};
