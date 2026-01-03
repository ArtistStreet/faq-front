import { GraphQLClient as GraphQLRequestClient, Variables } from 'graphql-request';
import { AUTH_KEYS } from 'constants/auth';
import { OPERATION_NAME, REACT_APP_API_URL } from 'constants/common';
import { clearStorage, getLocalStorage, removeLocalStorage, setLocalStorage } from 'utils/localStorage';
import includes from 'lodash/includes';
import { RefreshQuery, UserQuery } from 'types/User';
import { HttpStatusCode } from 'axios';
import { showToast } from '../utils/common';
import { REFRESH } from 'services/UserService';

interface GraphQLErrorResponse {
     status: number;
}

export default class GraphQLClient {
     private readonly client: GraphQLRequestClient;
     private refreshToken: string;
     private accessToken: string;
     private readonly endpoint: string;

     constructor() {
          this.endpoint = `${REACT_APP_API_URL}/graphql`;
          this.accessToken = getLocalStorage(AUTH_KEYS.ACCESS_TOKEN);
          this.refreshToken = getLocalStorage(AUTH_KEYS.REFRESH_TOKEN);
          this.client = this.createClient();
     }

     private createClient(): GraphQLRequestClient {
          return new GraphQLRequestClient(this.endpoint, {
               headers: this.getHeaders(),
          });
     }

     private getHeaders(): Record<string, string> {
          const headers: Record<string, string> = {};

          if (this.accessToken) {
               headers['Authorization'] = `Bearer ${this.accessToken}`;
          }

          return headers;
     }

     private updateHeaders(): void {
          this.client.setHeaders(this.getHeaders());
     }

     private async validateToken(operationName: string): Promise<void> {
          const publicOperations = ['login', 'register', 'forgotPassword', 'changePassword', 'resetPassword'];

          if (includes(publicOperations, operationName)) {
               return;
          }

          this.updateHeaders();
     }

     private async handleRefreshToken(): Promise<void> {
          try {
               const response = await this.client.request<RefreshQuery>(REFRESH, { refresh_token: this.refreshToken });
               if (response.auth_refresh) {
                    this.accessToken = response.auth_refresh.token.access_token;
                    this.refreshToken = response.auth_refresh.token.refresh_token;
                    setLocalStorage(AUTH_KEYS.ACCESS_TOKEN, this.accessToken);
                    setLocalStorage(AUTH_KEYS.REFRESH_TOKEN, this.refreshToken);
                    return;
               }
               this.handleErrorRefreshToken();
          } catch (error) {
               this.handleErrorRefreshToken();
          }
     }

     private handleErrorRefreshToken(): void {
          this.accessToken = '';
          this.refreshToken = '';
          clearStorage();
     }
     // tslint:disable-next-line: no-any
     public async request<T = any, V extends Variables = Variables>(
          query: string,
          variables?: V,
          operationName?: string
     ): Promise<T> {
          await this.validateToken(operationName ?? '');

          if (operationName === OPERATION_NAME.LOGOUT) {
               this.accessToken = '';
               this.refreshToken = '';
               removeLocalStorage(AUTH_KEYS.ACCESS_TOKEN);
               removeLocalStorage(AUTH_KEYS.REFRESH_TOKEN);
          }

          try {
               const response = await this.client.request<T>(query, variables);
               if (operationName === OPERATION_NAME.LOGIN) {
                    const dataLogin = response as UserQuery;
                    this.accessToken = dataLogin.auth_login.token.access_token;
                    this.refreshToken = dataLogin.auth_login.token.refresh_token;
                    setLocalStorage(AUTH_KEYS.ACCESS_TOKEN, this.accessToken);
                    setLocalStorage(AUTH_KEYS.REFRESH_TOKEN, this.refreshToken);
               }

               return response;
               // tslint:disable-next-line: no-any
          } catch (error: any) {
               if (operationName === OPERATION_NAME.LOGOUT) {
                    return {} as T;
               }
               if (error.response?.status) {
                    const graphqlError = error.response as GraphQLErrorResponse;
                    if (graphqlError.status === HttpStatusCode.Unauthorized) {
                         try {
                              await this.handleRefreshToken();
                              return this.client.request<T>(query, variables);
                         } catch (refreshError) {
                              this.handleErrorRefreshToken();
                              throw new Error('Session expired. Please login again.');
                         }
                    }
               }
               const ERROR_MESSAGE = 'Đã xảy ra lỗi trong quá trình thực hiện';
               showToast(false, [ERROR_MESSAGE]);
               throw new Error(ERROR_MESSAGE);
          }
     }
}

const graphqlClient = new GraphQLClient();
export { graphqlClient };
