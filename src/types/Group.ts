import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';
import { Role } from './common/Item';

export default interface Group extends BaseModel {
     name: string;
     description?: string;
     role: Role;
     parent_id?: number;
     children?: Group[];
     hasChildren?: Boolean;
     isOpen?: boolean;
     isLoading?: boolean;
}

export interface RootGroupsData {
     rootGroups: {
          data: Group[];
          totalCount: number;
          totalPages: number;
          currentPage: number;
     };
}

export interface ChildrenData {
     groupChildren: {
          data: Group[];
          total: number;
          page: number;
          limit: number;
     };
}