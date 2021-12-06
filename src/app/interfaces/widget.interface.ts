import { WidgetType } from './enums/widget-type.enum';


export interface Widget<T> {
  id?: number;
  name: string;
  type: WidgetType;
  data: T;
}
