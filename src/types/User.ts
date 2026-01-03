import { FILTER_CONDITIONS } from '../constants/common';
import Group from './Group';
import { baseFilterConfig, BaseModel, BaseSearch, DataList, FilterConfig } from './common';
import { ItemParam, ItemStatus } from './common/Item';

export enum Gender {
    MALE = 1,
    FEMALE = 2,
    OTHER = 3,
}

export enum UserRole {
    ADMIN = 1,
    CONTRIBUTOR = 2,
}
export interface LoginData {
    user_name: string;
    password: string;
    role_id: number;
}

export interface ForgotPasswordData {
    email: string;
    role_id: number;
}

export interface ChangePassword {
    old_password: string;
    password: string;
    confirm_password: string;
    token?: string;
}

export interface ChangePasswordToken {
    password: string;
    confirm_password: string;
    token?: string;
    otp: string;
}

export interface SearchUser extends BaseSearch {
    role_id?: string;
}

export type SearchUserParam = {
    [key in keyof SearchUser]: string;
};

export const UserRoleNames: ItemParam[] = [
    { id: UserRole.ADMIN, name: 'admin' },
    { id: UserRole.CONTRIBUTOR, name: 'contributor' },
];

export const GenderNames: ItemParam[] = [
    { id: Gender.MALE, name: 'male' },
    { id: Gender.FEMALE, name: 'female' },
    { id: Gender.OTHER, name: 'other' },
];

export default interface User extends BaseModel {
    user_name: string;
    full_name: string;
    phone: string;
    email: string;
    password: string;
    address: string;
    avatar_id?: number | null;
    avatar?: {
        file_name: string;
        file_url: string;
    };
    gender_id: Gender;
    role_id: UserRole;
    status_id: ItemStatus;
    telegram_id?: string;
    birthday?: string;
    email_notify: boolean;
    telegram_notify: boolean;
    zalo_notify: boolean;
    email_verified: boolean;
    phone_verified: boolean;
    token: {
        access_token: string;
        refresh_token: string;
    };
    confirm_password?: string;
    groups: Group[];
}

export interface UserQuery {
    auth_login: User;
}

export interface ProfileQuery {
    auth_profile: User;
}

export interface LogoutQuery {
    auth_logout: boolean;
}

export interface RefreshQuery {
    auth_refresh: User;
}

export interface UserListQuery {
    users_list: DataList<User>;
}

export const userFilterConfig: FilterConfig = {
    ...baseFilterConfig,
    role_id: { key: 'role_id', operator: FILTER_CONDITIONS.EQUAL },
};

export interface UserCreate {
    users_create: User;
}

export interface UserUpdate {
    users_update: User;
}

export interface UserDetail {
    users_detail: User;
}

export interface UserRestPass {
    users_reset_pass: boolean;
}

export interface AuthUpdateRes {
    auth_update: User;
}

export interface UserForgotPass {
    auth_forgot_pass: string;
}
