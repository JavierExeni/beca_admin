import { USER_TYPE } from '../shared/enum';

export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  refresh: string;
  access: string;
};

export type AuthDecoded = {
  user_id: number;
  user: string;
  user_role: USER_TYPE;
};
