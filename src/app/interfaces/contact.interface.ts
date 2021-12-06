import {Department} from './department.interface';
import {Office} from './office.interface';
import {Variant} from './variant.interface';
import {Page} from './page.interface';

export interface Contact{
  id?: number;
  name: string;
  position: string;
  email: string;
  phones: string[];
  description: string;
  ordering?: number;
  showForm: boolean;
  status: boolean;
  variants?: Variant[];
  pages?: Page[];
}
