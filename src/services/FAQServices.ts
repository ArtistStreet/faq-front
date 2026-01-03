import { gql } from '@apollo/client';

export const FAQ_LIST = gql`
  query FAQList {  
    faqList {
      id
      question
      answer
      categories
      group_id
    }
  }
`;

export const FAQ_CREATE = gql`
  mutation CreateFAQ($body: CreateFaqInput) {
    createFaq(body: $body) {
      id
      question
      answer
      categories
      group_id
    }
  }
`;

export const FAQ_UPDATE = gql`
  mutation UpdateFaq($body: UpdateFaqInput) {
    updateFAQ(body: $body) {
      id
      question
      answer
      categories 
      group_id
    }
  }
`;

export const FAQ_DELETE = gql`
    mutation DeleteFAQ($id: Int!) {
        deleteFaq(id: $id)
    }
`;