import { gql } from '@apollo/client';

// export const SHOP_LIST = gql`
//      query SHOPList($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {  
//           faqList(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
//                totalCount
//                totalPages
//                currentPage
//                data {
//                     id
//                     question
//                     answer
//                     category {
//                          id
//                          name
//                          description
//                     }
//                }
//           }
//      }
// `;

export const SHOP_CREATE = gql`
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
          id
          name
          desc
          address
          created_by
    }
  }
`;

export const SHOP_UPDATE = gql`
  mutation UpdateShop($id: Int!, $input: UpdateShopInput!) {
    updateShop(id: $id, input: $input) {
          id
          name
          desc
          address
          created_by
    }
  }
`;

export const SHOP_DELETE = gql`
    mutation DeleteShop($id: Int!) {
        deleteShop(id: $id)
    }
`;