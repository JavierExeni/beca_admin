import { USER_TYPE } from '../shared/enum';

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Teacher = {
  user: User;
};

export type Client = {
  user: User;
};

export type UserRequest = {
  user: Omit<User, 'id'> & { password: string };
  user_type: USER_TYPE;
  extra?: {
    birthday: string;
    gender: number;
    city_id: number;
  };
};


