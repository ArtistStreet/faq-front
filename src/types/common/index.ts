import { FILTER_CONDITIONS } from '../../constants/common';

export interface Paging {
    count_item: number;
    total_page: number;
    current_page: number;
    limit: number;
}

export interface BaseSearch {
    search?: string;
    filters?: string[];
    sort?: string;
    page?: number;
    limit?: number;
    department_id?: string;
    status_id?: string;
}

export type BaseSearchParam = {
    [key in keyof BaseSearch]: string;
};

export interface BaseModel {
    id?: number;
    created_by?: number;
    updated_by?: number;
    deleted_by?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface DataList<T> {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    data: T[];
}

export interface FilterConfig {
    [key: string]: { key: string; operator: string };
}

export const baseFilterConfig: FilterConfig = {
    status_id: { key: 'status_id', operator: FILTER_CONDITIONS.IN },
    department_id: { key: 'department_id', operator: FILTER_CONDITIONS.EQUAL },
};