import { BaseModel } from './index';

export interface ItemParam {
     id: number;
     name: string;
     desc?: string;
     className?: string;
}

export interface ItemId {
     id: number;
}

export interface SelectOption {
     value: number;
     label: string;
     [key: string]: string | number | boolean;
}

export interface SelectOptionGroup {
     label: string;
     options: SelectOption[];
}

export enum TrueFalse {
     FALSE = 0,
     TRUE = 1,
}

// export enum Language {
//     EN = 'en',
// }

export enum Unit {
     OFFICE = 1,
}

export enum Role {
     MANAGER = 1,
     OFFICER = 2,
     PRESIDENT = 3,
}

export const UnitNames: ItemParam[] = [
     { id: Unit.OFFICE, name: 'active', className: 'badge badge-glow bg-success' },
];

export const RoleName: ItemParam[] = [
     { id: Role.MANAGER, name: 'manager', className: 'badge badge-glow bg-warning' },
     { id: Role.OFFICER, name: 'officer', className: 'badge badge-glow bg-success' },
     { id: Role.PRESIDENT, name: 'president', className: 'badge badge-glow bg-danger' },
];

export type TypeMedia = 'image' | 'video' | 'audio' | 'document' | 'attachment' | 'avatar1' | 'avatar2';

export interface SelectOptionModel {
     value: string;
     label: string;
}

export interface ItemParamModel {
     id: string;
     name: string;
     className?: string;
}

export type HiddenImageProps = 'none' | 'desktop' | 'mobile';
