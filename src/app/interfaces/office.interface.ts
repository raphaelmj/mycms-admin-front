import {Department} from './department.interface';
import {Contact} from './contact.interface';
import {Page} from './page.interface';
import {Variant} from './variant.interface';
import {Investition} from './investition.interface';
import {MapFiles} from './map-files.interface';
import {ContactElement} from './contact-element.interface';

export interface Office{
  id?: number;
  title: string;
  alias?: string;
  subTitle: string;
  phones: string[];
  emails: string[];
  address: string;
  hours: string[];
  description: string;
  mapLat: number;
  mapLng: number;
  mapFiles: MapFiles;
  mainMapFiles: MapFiles;
  main: boolean;
  contactsSections: ContactElement[];
  ordering: number;
  departments?: Department[];
  investitions?: Investition[];
  pages?: Page[];
  variant?: Variant;
}
