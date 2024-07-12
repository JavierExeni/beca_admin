import { Client, Teacher } from './user.interface';

export type Webinar = {
  id: number;
  title: string;
  description: string;
  youtube_code: string;
  created_by: Teacher;
  client_views: Client;
  is_active: boolean;
};

export type WebinarRequest = Omit<
  Webinar,
  'id' | 'created_by' | 'client_views'
> & {
  created_by_id: number;
  client_views: number[];
};
