import {Component, Input, OnInit} from '@angular/core';
import {GalleryElement} from '../../../../interfaces/investition.interface';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {
  @Input() galleryElements: GalleryElement[] = [];
  webUrl: string = environment.WEB_URL;

  constructor() { }

  ngOnInit(): void {
  }

}
