import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';
import Category from './Category';

export default interface Faq extends BaseModel {
     question: string;
     answer: string;
     categoryIds?: number[];
     category?: Category[];
}

export interface FaqFormInput {
     question: string;
     answer: string;
     categoryIds: number[];
}


export interface FaqQuery {
     faqList: {
          data: Faq[];
          totalCount: number;
          totalPages: number;
          currentPage: number;
     }
}
