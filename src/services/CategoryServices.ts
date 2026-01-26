import { gql } from '@apollo/client';

export const CATEGORY_LIST = gql`
  query CategoryList($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {  
    categoryList(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
          totalCount
          totalPages
          currentPage
          data {
               id
               name
               description
          }
    }
  }
`;

export const CATEGORY_CREATE = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
    }
  }
`;

export const CATEGORY_UPDATE = gql`
  mutation UpdateCategory($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

export const CATEGORY_DELETE = gql`
    mutation DeleteCategory($id: Int!) {
        deleteCategory(id: $id)
    }
`;