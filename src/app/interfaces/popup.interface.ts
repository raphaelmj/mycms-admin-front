import {LinkTarget} from './types/link-target';
import {Page} from './page.interface';
import {Variant} from './variant.interface';
import {Department} from './department.interface';
import {ImagePopup} from './image-popup.interface';
import {Investition} from './investition.interface';

export interface PopupData {
  hasLink: boolean;
  link: string;
  target: LinkTarget;
  image?: ImagePopup;
}

export interface Popup {
  id?: number;
  name: string;
  popupData: PopupData;
  status: boolean;
  showEveryWhere: boolean;
  pages?: Page[];
  variants?: Variant[];
  departments?: Department[];
  investitions?: Investition[];
}
