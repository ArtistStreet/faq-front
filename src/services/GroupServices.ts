import { gql } from '@apollo/client';

export const GET_ROOT_GROUPS = gql`
  query GetRootGroups($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {
    rootGroups(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
     totalCount
     totalPages
     currentPage
     data {
          id
          name
          description
          hasChildren 
          role
     }
    }
  }
`;

export const GET_GROUP_CHILDREN = gql`
  query GetGroupChildren(
  $id: Int!,
  $page: Int!,
  $limit: Int!,
  $filters: [String!],
  $sort: String,
  $search: String
) {
  groupChildren(
    id: $id,
    input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }
  ) {
    totalCount
    totalPages
    currentPage
    data {
      id
      name
      description
      hasChildren
      role
    }
  }
}

`;

export const GROUP_CREATE = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      description
      parent_id
      role
    }
  }
`;

export const GROUP_UPDATE = gql`
  mutation UpdateGroup($id: Int!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      name
      description
      parent_id
      role
    }
  }
`;

export const GROUP_DELETE = gql`
    mutation GroupDelete($id: Int!) {
        deleteGroup(id: $id)
    }
`;