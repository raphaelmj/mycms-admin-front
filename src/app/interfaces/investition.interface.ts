import {Office} from './office.interface';
import {Variant} from './variant.interface';
import {MediaType} from './types/media-type';
import {ImageElement} from './image-element.interface';
import {MapFiles} from './map-files.interface';
import {GalleryType} from './enums/gallery-type.enum';
import {MovieElement} from './movie-element.interface';
import {ContactElement} from './contact-element.interface';
import {Popup} from './popup.interface';

export interface GalleryElement extends ImageElement, MovieElement {
  type: MediaType;
}


export interface LinkElement {
  link: string;
  name: string;
}

export interface ProgressGalleryElement {
  name: string;
  imageThumb: string;
  images: GalleryElement[];
}

export enum CustomTableElementStateName {
  rent = 'rent',
  free = 'free'
}

export interface CustomTableElementState {
  stateName: CustomTableElementStateName;
  firm: string;
}

export interface CustomTableInfoAssets {
  situaPlan?: ImageElement | null;
  buildingLocation: ImageElement | null;
  plan: ImageElement | null;
}

export interface CustomTableElement {
  building?: string;
  localName: string;
  state: CustomTableElementState;
  area: string;
  infoAssets: CustomTableInfoAssets;
}

export interface Investition{
  id?: number;
  name: string;
  alias?: string;
  listImage: string;
  fullImage: string;
  logo: string;
  location: string;
  city: string;
  labelColor: string;
  address: string;
  rentAreaSpace: string;
  areaSize: string;
  parking: string;
  rentiers: string;
  textLeft: string;
  textRight: string;
  openDate: string;
  remodeling: string;
  buyDate: Date;
  gallery: GalleryElement[];
  progressGallery: ProgressGalleryElement[];
  district: string;
  buildingsCount: string;
  floorCount: string;
  flatCount: string;
  flatsAreas: string;
  garageCount: string;
  serviceLocalsCount: string;
  endDate: string;
  workState: string;
  contactLink: string;
  status: boolean;
  customTable: CustomTableElement[];
  showCustomTable: boolean;
  link: LinkElement;
  mapFiles: MapFiles;
  mapLat: number;
  mapLng: number;
  webMap: string;
  showDistrictLabel: boolean;
  showWebsite: boolean;
  galleryType: GalleryType;
  contacts: ContactElement[];
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  ordering: number;
  offices?: Office[];
  variants?: Variant[];
  popups?: Popup[];
}
