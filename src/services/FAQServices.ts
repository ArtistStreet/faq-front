import { gql } from '@apollo/client';

export const FAQ_LIST = gql`
     query FAQList($page: Int!, $limit: Int!, $filters: [String!], $sort: String, $search: String) {  
          faqList(input: { page: $page, limit: $limit, filters: $filters, sort: $sort, search: $search }) {
               totalCount
               totalPages
               currentPage
               data {
                    id
                    question
                    answer
                    category {
                         id
                         name
                         description
                    }
               }
          }
     }
`;

export const FAQ_CREATE = gql`
  mutation CreateFAQ($input: CreateFaqInput!) {
    createFaq(input: $input) {
      id
      question
      answer
      category {
          id
          name
          description
     }
    }
  }
`;

export const FAQ_UPDATE = gql`
  mutation UpdateFaq($id: Int!, $input: UpdateFaqInput!) {
    updateFAQ(id: $id, input: $input) {
      id
      question
      answer
      category {
          id
          name
          description
     } 
    }
  }
`;

export const FAQ_DELETE = gql`
    mutation DeleteFAQ($id: Int!) {
        deleteFaq(id: $id)
    }
`;