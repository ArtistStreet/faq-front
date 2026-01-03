import { gql } from '@apollo/client';

export const GROUP_LIST = gql`
  query GroupList {  
    groupList {
      id
      name
      description
      role
      parent {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`;

export const GET_ROOT_GROUPS = gql`
  query GetRootGroups {
    rootGroups {
      id
      name
      description
      hasChildren 
      roles {
        id
        name
      }
    }
  }
`;

export const GET_GROUP_CHILDREN = gql`
  query GetGroupChildren($parentId: Int!) {
    groupChildren(parentId: $parentId) {
      id
      name
      description
      hasChildren
      roles {
        id
        name
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
      roles {
        id
        name
      }
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
      roles {
        id
        name
      }
    }
  }
`;

export const GROUP_DELETE = gql`
    mutation GroupDelete($id: Int!) {
        deleteGroup(id: $id)
    }
`;