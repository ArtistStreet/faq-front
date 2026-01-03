// import Action from '../types/Action';

export const REACT_APP_API_URL = '';

export const PAGINATION = {
     countItem: 0,
     totalPage: 1,
     currentPage: 1,
     limit: 10,
};

export enum QUERY_KEY {
     ACTIONS = 'actions',
     USERS = 'users',
     USER = 'user',
     PROFILE = 'profile',
     //USER_ACTIONS = 'user_actions',
     GROUPS = 'groups',
}

export const OPERATION_NAME = {
     LOGIN: 'login',
     LOGOUT: 'logout',
     ACTION_LIST: 'action_list',
     ACTION_CREATE: 'action_create',
     ACTION_DELETE: 'action_delete',
     FORGOT_PASSWORD: 'forgot_password',
     CHANGE_PASSWORD: 'change_password',
} as const;

export const FILTER_CONDITIONS = {
     EQUAL: '=',
     NOT_EQUAL: '!=',
     GREATER_THAN: '>',
     LESS_THAN: '<',
     GREATER_OR_EQUAL: '>=',
     LESS_OR_EQUAL: '<=',
     LIKE: '~',
     NOT_LIKE: '!~',
     IN: '[]',
     NOT_INT: '![]',
} as const;

export const PATH = {
     HOME: '/',
     NOT_FOUND: '/not-found',
} as const;

export const PAGE_NUMBER_DEFAULT = 1;
export const LIMIT_MAX = 999;
export const DEFAULT_IMAGE = '/assets/images/custom/default.png';
export const DEFAULT_COLOR = '#a42c48';

// export const USER_MENU: Action[] = [
//      {
//           id: 999,
//           name: 'Tài khoản',
//           url: '',
//           icon: 'users',
//           display_order: 1,
//           children: [
//                { id: 990, name: 'Thông tin cá nhân', url: '/user/profile', icon: 'user', display_order: 1 },
//                { id: 991, name: 'Thông báo cá nhân', url: '/notification', icon: 'bell', display_order: 1 },
//                { id: 992, name: 'Tài nguyên của tôi', url: '/folder', icon: 'folder', display_order: 1 },
//                { id: 993, name: 'Quản lý thiết bị', url: '/loginHistory', icon: 'activity', display_order: 1 },
//                { id: 994, name: 'Quản lý bút danh', url: '/user/pseudonym', icon: 'pen-tool', display_order: 1 },
//           ],
//      },
// ];

export enum ARTICLE_TAB {
     INFORMATION = 'information',
     PUBLISH = 'publish',
     SEO = 'seo',
     ROYALTIES = 'royalties',
     MEDIA = 'media',
     EXCHANGE = 'exchange',
     HISTORY = 'history',
     OTHER = 'other',
     UTILITIES = 'utilities',
}
