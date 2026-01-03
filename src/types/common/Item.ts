export interface ItemParam {
    id: number;
    name: string;
    className?: string;
}

export interface ItemLink {
    id?: number;
    text: string;
    to?: string;
    icon?: 'PLUS' | 'DOWNLOAD' | 'SEND';
    fnCallBack?: {
        actionMenu: (id: number) => void;
    };
}

export interface ItemId {
    id: number;
}

export interface ItemFile {
    id: number;
    name: string;
    url: string;
    mineType?: string;
    fileSize?: number;
}

export interface SelectOption {
    value: number;
    label: string;
}

// export enum TrueFalse {
//     FALSE = 0,
//     TRUE = 1,
// }

// export enum Language {
//     EN = 'en',
// }

export enum ItemStatus {
    PENDING = 1,
    ACTIVE = 2,
}

export enum ItemParamType {
    GROUP = 'group',
}

export enum ItemLanguage {
    VI = 1,
    EN = 2,
    CN = 3,
}

export enum ArticleType {
    ELECTRONIC = 1,
    PAPER = 2,
    TELEVISION = 3,
}

export enum LayoutType {
    ARTICLE = 1,
    CATEGORY = 2,
}

export const ItemStatusNames: ItemParam[] = [
    { id: ItemStatus.PENDING, name: 'pending', className: 'badge badge-glow bg-warning' },
    { id: ItemStatus.ACTIVE, name: 'active', className: 'badge badge-glow bg-success' },
];

// export const YesNoChoices: ItemParam[] = [
//     { id: TrueFalse.FALSE, name: 'no', className: 'badge badge-glow bg-danger' },
//     { id: TrueFalse.TRUE, name: 'yes', className: 'badge badge-glow bg-success' },
// ];

export const ItemLanguageNames: ItemParam[] = [
    { id: ItemLanguage.VI, name: 'vi', className: 'badge badge-glow bg-success' },
    { id: ItemLanguage.EN, name: 'en', className: 'badge badge-glow bg-info' },
    { id: ItemLanguage.CN, name: 'cn', className: 'badge badge-glow bg-warning' },
];

export const ArticleTypeNames: ItemParam[] = [
    { id: ArticleType.ELECTRONIC, name: 'electronic' },
    { id: ArticleType.PAPER, name: 'paper' },
    { id: ArticleType.TELEVISION, name: 'television' },
];

export type TypeMedia = 'image' | 'video' | 'audio' | 'avatar1' | 'avatar2';

export enum ArticleTypeType {
    ALL = 0,
    UNCLASSIFIED = 2,
    ELECTRIC = 1,
    PAPER = 3,
}
export const LayoutTypeNames: ItemParam[] = [
    { id: LayoutType.CATEGORY, name: 'category', className: 'badge badge-glow bg-info' },
    { id: LayoutType.ARTICLE, name: 'article', className: 'badge badge-glow bg-success' },
];
