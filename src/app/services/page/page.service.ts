import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page, PageSlide} from '../../interfaces/page.interface';
import {environment} from '../../../environments/environment';
import {ImageFormat} from '../../interfaces/types/image-format';

export interface PageAssociations {
    articleId?: number;
    contactId?: number;
    categoryId?: number;
    officeId?: number;
}

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(private httpClient: HttpClient) {
    }

    getPages(): Observable<Page[]> {
        return this.httpClient.get<Page[]>(environment.API_URL + '/page/all');
    }

    updatePage(page: Page, associations?: PageAssociations): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/update', {page, associations});
    }

    updatePageSlideLogo(croppedImage: string, imageFormat: ImageFormat, id: number, noImage: boolean, currentLogo: string): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/update/slides/logo', {
            croppedImage,
            imageFormat,
            id,
            noImage,
            currentLogo
        });
    }

    updatePageSlides(slides: PageSlide[], id: number): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/update/slides/list', {slides, id});
    }

    addSlide(croppedImage: string, imageFormat: ImageFormat, id: number): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/add/slide', {croppedImage, imageFormat, id});
    }

    changeOneSlideLogo(croppedImage: string, imageFormat: ImageFormat, id: number, index: number): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/update/slide/one/logo', {croppedImage, imageFormat, id, index});
    }

    changeOneSlideImage(croppedImage: string, imageFormat: ImageFormat, id: number, index: number): Observable<Page> {
        return this.httpClient.post<Page>(environment.API_URL + '/page/update/slide/one/image', {croppedImage, imageFormat, id, index});
    }
}
