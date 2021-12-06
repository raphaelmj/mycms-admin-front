import {PageViewType} from './enums/page-view-type.enum';
import {Contact} from './contact.interface';
import {Article} from './article.interface';
import {Category} from './category.interface';
import {Office} from './office.interface';
import {Variant} from './variant.interface';
import {Department} from './department.interface';
import {Color} from './color.interface';
import {LinkTarget} from './types/link-target';
import {Popup} from './popup.interface';

export type ArticlePresentationType = 'default';
export type ContactPresentationType = 'default';
export type DepartmentPresentationType = 'default';
export type NoticesPresentationType = 'default';

export interface PageAssociations {
  articleId?: number;
  contactId?: number;
  categoryId?: number;
  officeId?: number;
  variantIds: number[];
  departmentIds: number[];
}


export interface MainPageConfig extends Record<any, unknown>{

}

export interface InvestsPageConfig extends Record<any, unknown>{

}

export interface ArticlePageConfig{
  presentation: ArticlePresentationType;
}

export interface ArticlesPageConfig {
  columns: number;
}

export interface PersonOfficesPageConfig extends Record<any, unknown>{

}

export interface OfficePersonsPageConfig extends Record<any, unknown>{

}

export interface ContactPageConfig{
  presentation: ArticlePresentationType;
}

export interface DepartmentPageConfig{
  presentation: ArticlePresentationType;
}

export interface NoticesPageConfig{
  presentation: ArticlePresentationType;
}

export interface PageConfig {
  main: MainPageConfig;
  invests: InvestsPageConfig;
  article: ArticlePageConfig;
  articles: ArticlesPageConfig;
  personOffices: PersonOfficesPageConfig;
  officePersons: OfficePersonsPageConfig;
  contact: ContactPageConfig;
  department: DepartmentPageConfig;
  notices: NoticesPageConfig;
}

export interface PageSlide {
  slide: string;
  logo: string;
}

export interface PageSlides {
  imageTitle?: string;
  slideList: PageSlide[];
}

export interface PageRightLink{
  name: string;
  link: string;
  target: LinkTarget;
  icon: string;
}

export interface Page{
  id?: number;
  title: string;
  alias: string;
  linkTitle: string;
  path: string;
  viewType: PageViewType;
  slides: PageSlides;
  config: PageConfig;
  pageColor: Color;
  rightLinks: PageRightLink[];
  ordering: number;
  leftPages?: number[];
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  contact?: Contact;
  category?: Category;
  article?: Article;
  office?: Office;
  variants?: Variant[];
  departments: Department[];
  department?: Department;
  popups?: Popup[];
  contextMenuTop?: number[];
  contextMenuBottom?: number[];
}
