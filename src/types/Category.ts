import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';
import Faq from './Faq';

export default interface Category extends BaseModel {
     name: string;
     faq?: Faq;
     description?: string;
}

export interface CategoryQuery {
     categoryList: {
          data: Category[];
          totalCount: number;
          totalPages: number;
          currentPage: number;
     }
}
