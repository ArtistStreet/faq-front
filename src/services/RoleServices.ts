import { gql } from '@apollo/client';

export const ROLE_LIST = gql`
  query RoleList {  
    roleList {
      id
      name
    }
  }
`;

export const ROLE_CREATE = gql`
     mutation CreateRole($name: String!) {
          createRole(name: $name) {
               id
               name
          }
     }
`;

export const ROLE_DELETE = gql`
    mutation DeleteRole($id: Int!) {
        deleteRole(id: $id)
    }
`;
