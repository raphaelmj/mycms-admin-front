import {Category} from './category.interface';

export interface Article {
  id?: number;
  title: string;
  alias?: string;
  image?: string;
  short: string;
  content?: string;
  leftContent?: string;
  rightContent?: string;
  publishedAt?: any;
  status: boolean;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  category?: Category;
}
