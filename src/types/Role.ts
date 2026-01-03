import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';

export default interface Role extends BaseModel {
     name: string;
}

export interface RoleQuery {
     roleList: Role[];
}