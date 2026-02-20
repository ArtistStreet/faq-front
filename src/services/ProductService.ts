import { gql } from '@apollo/client';

export const LIST_PRODUCT = gql`
     query ProductList($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {  
          listProduct(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
               totalCount
               totalPages
               currentPage
               data {
                    id
                    name
                    desc
                    price
                    stock
                    category {
                         id
                         name
                    }
                    status
               }
          }
     }
`;

export const PUBLIC_LIST_PRODUCT = gql`
     query PublicProductList($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {  
          publicListProduct(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
               totalCount
               totalPages
               currentPage
               data {
                    id
                    name
                    desc
                    price
                    stock
                    category {
                         id
                         name
                    }
                    status
               }
          }
     }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
          id
          name
          desc
          price
          stock
          category {
               id
               name
          }
          shop {
               id
               name
          }
          status
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $input: CreateProductInput!) {
    updateProduct(id: $id, input: $input) {
          id
          name
          desc
          price
          stock
          category {
               id
               name
          }
          status
    }
  }
`;

export const DETAIL_PRODUCT = gql`
  query DetailProduct($id: Int!) {
    detailProduct(id: $id) {
          id
          name
          desc
          price
          stock
          category {
               id
               name
          }
          shop {
               id
               name
          }
          status
    }
  }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: Int!) {
        deleteProduct(id: $id)
    }
`;