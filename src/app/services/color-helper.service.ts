import { Injectable } from '@angular/core';
import {Color} from '@angular-material-components/color-picker';

@Injectable({
  providedIn: 'root'
})
export class ColorHelperService {

  public static hexToColor(hex: string): Color {
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const color: Color = new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
    return color;
  }

}
