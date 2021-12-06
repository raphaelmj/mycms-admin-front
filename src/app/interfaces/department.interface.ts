import {Page} from './page.interface';
import {Office} from './office.interface';
import {DepartmentType} from './enums/department-type.enum';
import {ContactElement} from './contact-element.interface';
import {Popup} from './popup.interface';

export interface Department{
  id?: number;
  name: string;
  alias?: string;
  viewType: DepartmentType;
  params: {};
  main: boolean;
  offices: Office[];
  pages: Page[];
  contactsSections: ContactElement[];
  officesMap: number[];
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  ordering: number;
  showOnPage?: boolean;
  popups?: Popup[];
}
