import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Popup} from '../../interfaces/popup.interface';
import {PopupEntityType} from '../../panel/popups/routes-assocs/routes-assocs.component';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor(private httpClient: HttpClient) {
    }

    all(): Observable<Popup[]> {
        return this.httpClient.get<Popup[]>(environment.API_URL + '/popup/all');
    }

    updateStatus(id: number, status: boolean): Observable<Popup> {
        return this.httpClient.post<Popup>(environment.API_URL + '/popup/update/status', {id, status});
    }

    updateField(id: number, field: string, value: any): Observable<Popup> {
        return this.httpClient.post<Popup>(environment.API_URL + '/popup/update/field', {id, field, value});
    }

    update(popup: Popup, croppedImage: string, ids?: number[]): Observable<Popup> {
        return this.httpClient.post<Popup>(environment.API_URL + '/popup/update', {popup, croppedImage, ids});
    }

    create(popup: Popup, croppedImage: string, ids?: number[]): Observable<Popup> {
        return this.httpClient.post<Popup>(environment.API_URL + '/popup/create', {popup, croppedImage, ids});
    }

    unPinFrom(popup: Popup, popupEntityType: PopupEntityType, entityId: number): Observable<any> {
        return this.httpClient.post(environment.API_URL + '/' + popupEntityType + '/unpin/popup', {popup, popupEntityType, entityId});
    }

    pinTo(id: number, popupEntityType: PopupEntityType, entityId: number): Observable<any> {
        return this.httpClient.post(environment.API_URL + '/' + popupEntityType + '/pin/popup', {id, popupEntityType, entityId});
    }

    delete(id: number): Observable<any> {
        return this.httpClient.delete(environment.API_URL + '/popup/delete/' + id);
    }

    empty(): Popup {
        return {
            name: '',
            popupData: {
                hasLink: false,
                link: '',
                target: '_blank',
                image: null
            },
            showEveryWhere: false,
            status: false,
            pages: []
        };
    }

}
