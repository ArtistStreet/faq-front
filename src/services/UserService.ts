import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
          accessToken
          user {
               id
               email
               name
               role
          }
        }
    }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      name
    }
  }
`;

export const PROFILE = gql`
    query Auth_profile {
        auth_profile {
            id
            user_name
            full_name
            phone
            email
            address
            avatar_id
            gender_id
            role_id
            status_id
            telegram_id
            birthday
            email_notify
            telegram_notify
            zalo_notify
            email_verified
            phone_verified
            avatar {
                id
                file_name
                file_url
            }
        }
    }
`;

export const LOGOUT = gql`
    query Auth_logout {
        auth_logout
    }
`;

export const REFRESH = gql`
    mutation Auth_refresh($refresh_token: String!) {
        auth_refresh(body: { refresh_token: $refresh_token }) {
            id
            first_name
            last_name
            avatar
            role_id
            uid
            created_at
            token {
                access_token
                refresh_token
            }
        }
    }
`;

export const USER_LIST = gql`
    query Users_list($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {
        users_list(body: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
            totalCount
            totalPages
            currentPage
            data {
                id
                user_name
                full_name
                phone
                email
                address
                avatar_id
                gender_id
                role_id
                status_id
                telegram_id
                birthday
                email_notify
                telegram_notify
                zalo_notify
                email_verified
                phone_verified
                avatar {
                    id
                    file_name
                    file_url
                }
            }
        }
    }
`;

export const USER_DELETE = gql`
    mutation Users_delete($id: Int!) {
        users_delete(id: $id)
    }
`;

export const USER_CREATE = gql`
    mutation Users_create($body: UserCreateInputDto!) {
        users_create(body: $body) {
            id
        }
    }
`;

export const USER_UPDATE = gql`
    mutation Users_update($id: Int!, $body: UserUpdateInputDto!) {
        users_update(id: $id, body: $body) {
            id
            user_name
            full_name
            phone
            email
            address
            avatar_id
            gender_id
            role_id
            status_id
            telegram_id
            birthday
            email_notify
            telegram_notify
            zalo_notify
            email_verified
            phone_verified
            avatar {
                id
                file_name
                file_url
            }
        }
    }
`;

export const USER_DETAIL = gql`
    query Users_detail($id: Int!) {
        users_detail(id: $id) {
            id
            user_name
            full_name
            phone
            email
            address
            avatar_id
            gender_id
            role_id
            status_id
            telegram_id
            birthday
            email_notify
            telegram_notify
            zalo_notify
            email_verified
            phone_verified
            avatar {
                id
                file_name
                file_url
            }
            groups {
                id
            }
        }
    }
`;

export const USER_UPDATE_PROFILE = gql`
    mutation Auth_update($body: UserUpdateInputDto!) {
        auth_update(body: $body) {
            id
            first_name
            last_name
            phone_number
            email
            avatar_id
            role_id
            status_id
            gender_id
            birthday
            address
            uid
        }
    }
`;

export const USER_RESET_PASSWORD = gql`
    mutation Users_reset_pass($id: Int!, $password: String!, $confirm_password: String!) {
        users_reset_pass(id: $id, body: { password: $password, confirm_password: $confirm_password })
    }
`;

export const USERS_CHANGE_GROUPS = gql`
    mutation Users_change_groups($id: Int!, $body: ChangeGroupsInputDto!) {
        users_change_groups(id: $id, body: $body)
    }
`;

export const AUTH_UPDATE = gql`
    mutation Auth_update($body: ProfileInputDto!) {
        auth_update(body: $body) {
            id
        }
    }
`;

export const AUTH_CHANGE_PASSWORD = gql`
    mutation Auth_change_password($old_password: String!, $password: String!, $confirm_password: String!) {
        auth_change_password(
            body: { old_password: $old_password, password: $password, confirm_password: $confirm_password }
        )
    }
`;

export const USER_FORGOT_PASSWORD = gql`
    mutation Auth_forgot_pass($body: ForgotPasswordDto!) {
        auth_forgot_pass(body: $body)
    }
`;

export const USER_CHANGE_PASSWORD = gql`
    mutation Auth_reset_pass($body: ResetPasswordDto!) {
        auth_reset_pass(body: $body)
    }
`;
