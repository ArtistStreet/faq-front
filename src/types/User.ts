import Group from './Group';
import { BaseModel, BaseSearch, DataList, FilterConfig } from './common';

export default interface User extends BaseModel {
     name: string;
     role: number;
     email: string;
     password: string;
     avatar_id?: number | null;
     avatar?: {
          file_name: string;
          file_url: string;
     };
     token: {
          access_token: string;
          refresh_token: string;
     };
     groups: Group[];
}

export interface LoginData {
     login: {
          accessToken: string;
          user: User;
     };
}
