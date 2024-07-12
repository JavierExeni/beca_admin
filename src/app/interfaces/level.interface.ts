export type Level = {
  id: number;
  name: string;
  description: string;
};

export type LevelRequest = Omit<Level, 'id'>;
