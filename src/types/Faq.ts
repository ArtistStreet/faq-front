import { BaseModel, DataList, FilterConfig } from './common';
import { FILTER_CONDITIONS } from '../constants/common';

export default interface Faq extends BaseModel {
     question: string;
     answer: string;
     categories: string[];
     group_id: number;
}

export interface FaqQuery {
     faqList: Faq[];
}
