export type Language = {
  id: number;
  name: string;
  code: string;
  svg_flag: string;
  language: number;
};

export type LanguageRequest = Omit<Language, 'id' | 'svg_flag'> & {
  svg_flag: File;
  language?: number;
};
