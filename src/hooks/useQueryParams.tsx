import { useSearchParams } from 'react-router-dom';

type DefaultQueryParams = Record<string, string>;

export default function useQueryParams<T extends DefaultQueryParams = DefaultQueryParams>() {
    const [searchParams, setSearchParams] = useSearchParams();
    const getQueryParams = (): T => Object.fromEntries([...searchParams]) as T;

    const setQueryParams = (params: Partial<T>) => {
        const newParams = { ...getQueryParams(), ...params };
        setSearchParams(newParams as Record<string, string>);
    };
    return {
        queryParams: getQueryParams(),
        setQueryParams,
    };
}
