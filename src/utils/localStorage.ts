import { AUTH_KEYS } from '../constants/auth';

export const getLocalStorage = (item: string, defaultValue: string = '') => localStorage.getItem(item) ?? defaultValue;
export const setLocalStorage = (item: string, value: string) => localStorage.setItem(item, value);
export const removeLocalStorage = (item: string) => localStorage.removeItem(item);

export const resetType = 'clearStorage';
export const ResetStorageEvent = new EventTarget();

export const clearStorage = () => {
    localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
    const clearEvent = new Event(resetType);
    ResetStorageEvent.dispatchEvent(clearEvent);
};
