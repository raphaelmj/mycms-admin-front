import {Pipe, PipeTransform} from '@angular/core';
import {DepartmentType} from '../interfaces/enums/department-type.enum';

@Pipe({
  name: 'departmentTypeName'
})
export class DepartmentTypeNamePipe implements PipeTransform {
  types: Map<DepartmentType, string> = new Map<DepartmentType, string>(
    [
      [DepartmentType.main, 'Główne biuro'],
      [DepartmentType.buyArea, 'Zakup działek'],
      [DepartmentType.sellOfficeList, 'Biura'],
      [DepartmentType.commercial, 'Komercjalizacja'],
      [DepartmentType.investManagment, 'Zarządzanie'],
      [DepartmentType.contactsSections, 'Kontakty w sekcjach'],
      [DepartmentType.pressOffice, 'Biuro prasowe']
    ]
  );

  transform(value: DepartmentType): string {
    return this.types.get(value);
  }

}
