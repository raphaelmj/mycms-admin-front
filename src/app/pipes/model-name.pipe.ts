import { Pipe, PipeTransform } from '@angular/core';
import {EntityType} from '../interfaces/types/entity-type';

@Pipe({
  name: 'modelName'
})
export class ModelNamePipe implements PipeTransform {

  modelNames: Map<EntityType, string> = new Map<EntityType, string>([
    ['article', 'Artykuł'],
    ['department', 'Dział'],
    ['office', 'Biuro'],
    ['contact', 'Kontakt'],
    ['variant', 'Kategoria inwestycji'],
    ['category', 'Kategoria artykułów'],
    ['page', 'Strona'],
    ['investition', 'Inwestycja']
  ]);

  transform(value: EntityType): string {
    return this.modelNames.get(value);
  }

}
