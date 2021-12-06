import {Contact} from './contact.interface';
import {Office} from './office.interface';
import {Investition, LinkElement} from './investition.interface';
import {Page} from './page.interface';
import {VariantPresentationType} from './types/variant-presentation-type';
import {Color} from './color.interface';
import {Popup} from './popup.interface';
import {ContactElement} from './contact-element.interface';

export interface VariantParams {
  showDescriptions: boolean;
  showBanner: boolean;
  showLink: boolean;
  presentation?: VariantPresentationType;
}

export interface Variant{
  id?: number;
  name: string;
  alias?: string;
  path?: string;
  linkName: string;
  color: Color;
  leftDescription: string;
  rightDescription: string;
  banner: string;
  params: VariantParams;
  ordering: number;
  contactsSections: ContactElement[];
  link?: LinkElement | null;
  investitionsMap: number[];
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  offices?: Office[];
  contacts?: Contact[];
  variant?: Variant;
  investitions?: Investition[];
  page?: Page;
  popups?: Popup[];
}
