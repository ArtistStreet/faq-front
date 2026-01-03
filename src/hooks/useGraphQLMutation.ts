import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DocumentNode, print } from 'graphql';
import { Variables } from 'graphql-request';
import { graphqlClient } from '../services/GraphQLClient';

type QueryKeyT = readonly unknown[];

export interface GraphQLMutationOptions<TData, TVariables, TContext>
    extends Omit<UseMutationOptions<TData, Error, TVariables, TContext>, 'mutationFn'> {
    invalidateQueries?: string[] | QueryKeyT[];
}

export function useGraphQLMutation<TData = unknown, TVariables extends Variables = Variables, TContext = unknown>(
    mutation: DocumentNode | string,
    operationName?: string,
    options?: GraphQLMutationOptions<TData, TVariables, TContext>
): UseMutationResult<TData, Error, TVariables, TContext> {
    const queryClient = useQueryClient();
    const { invalidateQueries, ...mutationOptions } = options || {};

    return useMutation<TData, Error, TVariables, TContext>({
        mutationFn: (variables) => {
            const mutationString = typeof mutation === 'string' ? mutation : print(mutation);
            return graphqlClient.request<TData, TVariables>(mutationString, variables, operationName);
        },
        onSuccess: (data, variables, context) => {
            // Xử lý invalidate queries nếu được cung cấp
            if (invalidateQueries) {
                const queriesToInvalidate = Array.isArray(invalidateQueries) ? invalidateQueries : [invalidateQueries];

                queriesToInvalidate.forEach((queryKey) => {
                    queryClient.invalidateQueries({
                        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
                    });
                });
            }

            // Gọi onSuccess callback tùy chỉnh nếu được cung cấp
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        ...mutationOptions,
    });
}
