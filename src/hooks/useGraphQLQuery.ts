import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { DocumentNode, print } from 'graphql';
import { Variables } from 'graphql-request';
import { graphqlClient } from '../services/GraphQLClient';

type QueryKeyT = readonly unknown[];

export function useGraphQLQuery<TData = unknown, TVariables extends Variables = Variables>(
     queryKey: QueryKeyT,
     query: DocumentNode | string,
     variables?: TVariables,
     operationName?: string,
     options?: Omit<UseQueryOptions<TData, Error, TData, QueryKeyT>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, Error> {
     return useQuery<TData, Error, TData, QueryKeyT>({
          // eslint-disable-next-line @tanstack/query/exhaustive-deps
          queryKey,
          queryFn: () => {
               const queryString = typeof query === 'string' ? query : print(query);
               return graphqlClient.request<TData, TVariables>(queryString, variables, operationName);
          },
          ...options,
     });
}
