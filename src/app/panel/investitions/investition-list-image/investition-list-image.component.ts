import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-investition-list-image',
  templateUrl: './investition-list-image.component.html',
  styleUrls: ['./investition-list-image.component.scss']
})
export class InvestitionListImageComponent implements OnInit {
  @Input() listImage: string;
  @Input() croppedImage: string;
  @Input() labelColor: string;
  @Input() district: string;
  webUrl: string = environment.WEB_URL;

  constructor() { }

  ngOnInit(): void {
  }

}
