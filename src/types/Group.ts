import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';
import Role from './Role';

export default interface Group extends BaseModel {
     name: string;
     description?: string;
     question?: string;
     roles: Role[];
     roleIds?: number[];
     parent_id?: number;
     children?: Group[];
     hasChildren?: Boolean;
}

export interface GroupQuery {
     groups: Group[];
}

export interface RootGroupsData {
     rootGroups: Group[];
}

export interface ChildrenData {
     groupChildren: Group[];
}