import {Component, Input, OnInit} from '@angular/core';
import {GalleryElement, ProgressGalleryElement} from '../../../../interfaces/investition.interface';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-progress-gallery-view',
  templateUrl: './progress-gallery-view.component.html',
  styleUrls: ['./progress-gallery-view.component.css']
})
export class ProgressGalleryViewComponent implements OnInit {
  @Input() progressGalleries: ProgressGalleryElement[] = [];
  webUrl: string = environment.WEB_URL;

  constructor() { }

  ngOnInit(): void {
  }

}
