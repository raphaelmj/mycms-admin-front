import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Investition} from '../../interfaces/investition.interface';
import {environment} from '../../../environments/environment';
import {GalleryType} from '../../interfaces/enums/gallery-type.enum';

@Injectable({
  providedIn: 'root'
})
export class InvestitionService {

  constructor(private httpClient: HttpClient) { }

  queryFind(variantId?: number): Observable<Investition[]> {
    let params: HttpParams = new HttpParams();
    if (variantId){
      params = (new HttpParams()).append('variant', String(variantId));
    }
    return this.httpClient.get<Investition[]>(environment.API_URL + '/investition/query', {params});
  }

  updateField(data: {id: number, field: string, value: any}): Observable<Investition> {
    return this.httpClient.post<Investition>(environment.API_URL + '/investition/update/field', data);
  }

  create(
    investition: Investition,
    croppedImageList: string,
    croppedImageLogo: string,
    croppedImageFull: string,
    croppedLessMap: string,
    croppedMoreMap: string,
    variantIds: number[],
    officeIds: number[]
  ): Observable<Investition> {
    return this.httpClient.post<Investition>(environment.API_URL + '/investition/create',
      {
        investition,
        croppedImageList,
        croppedImageLogo,
        croppedImageFull,
        croppedLessMap,
        croppedMoreMap,
        variantIds,
        officeIds
      }
    );
  }

  update(
    investition: Investition,
    croppedImageList: string,
    croppedImageLogo: string,
    croppedImageFull: string,
    croppedLessMap: string,
    croppedMoreMap: string,
    variantIds: number[],
    officeIds: number[]
  ): Observable<Investition> {
    return this.httpClient.post<Investition>(environment.API_URL + '/investition/update',
      {
        investition,
        croppedImageList,
        croppedImageLogo,
        croppedImageFull,
        croppedLessMap,
        croppedMoreMap,
        variantIds,
        officeIds
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/investition/delete/' + id);
  }

  getByIds(ids: number[]): Observable<Investition[]> {
    return this.httpClient.post<Investition[]>(environment.API_URL + '/investition/by/ids', { ids });
  }

  createEmpty(): Investition {
    return {
      name: null,
      listImage: null,
      fullImage: null,
      logo: null,
      location: null,
      city: null,
      labelColor: null,
      address: null,
      rentAreaSpace: null,
      areaSize: null,
      parking: null,
      rentiers: null,
      textLeft: null,
      textRight: null,
      openDate: null,
      remodeling: null,
      buyDate: null,
      gallery: [],
      progressGallery: [],
      district: null,
      buildingsCount: null,
      floorCount: null,
      flatCount: null,
      flatsAreas: null,
      garageCount: null,
      serviceLocalsCount: null,
      endDate: null,
      workState: null,
      contactLink: null,
      status: false,
      customTable: null,
      link: null,
      mapFiles: null,
      mapLat: 0,
      mapLng: 0,
      webMap: null,
      showDistrictLabel: false,
      showWebsite: false,
      galleryType: GalleryType.none,
      contacts: [],
      ordering: null,
      offices: [],
      variants: [],
      showCustomTable: false,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    };
  }

}
