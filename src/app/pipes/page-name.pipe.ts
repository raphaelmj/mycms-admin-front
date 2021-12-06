import {Pipe, PipeTransform} from '@angular/core';
import {PageViewType} from '../interfaces/enums/page-view-type.enum';

@Pipe({
  name: 'pageName'
})
export class PageNamePipe implements PipeTransform {

  pagesNames: Map<PageViewType, string> = new Map<PageViewType, string>([
    [PageViewType.main, 'Strona główna'],
    [PageViewType.article, 'Artukuł pojedyncza kolumna'],
    [PageViewType.articles, 'Aktualnosci'],
    [PageViewType.doubleArticle, 'Artykuł układ dwukolumnowy'],
    [PageViewType.rodoArticle, 'Rodo artykuł'],
    [PageViewType.aboutArticleMapsView, 'O nas plus mapy'],
    [PageViewType.contact, 'Sekcja kontaktowa (zbiór)'],
    [PageViewType.department, 'Dział dane kontaktowe'],
    [PageViewType.notices, 'Ogłoszenia'],
    [PageViewType.invests, 'Inwestycje'],
  ]);

  transform(value: PageViewType): string {
    return this.pagesNames.get(value);
  }

}
