import {Pipe, PipeTransform} from '@angular/core';
import {GalleryType} from '../interfaces/enums/gallery-type.enum';

@Pipe({
  name: 'galleryType'
})
export class GalleryTypePipe implements PipeTransform {
  galleryTypesMap: Map<GalleryType, string> = new Map([
    [GalleryType.none, 'Brak'],
    [GalleryType.standard, 'Kolekcja zdjęć'],
    [GalleryType.progress, 'Galeria z budowy']
  ]);

  transform(value: GalleryType): unknown {
    return this.galleryTypesMap.get(value);
  }

}
