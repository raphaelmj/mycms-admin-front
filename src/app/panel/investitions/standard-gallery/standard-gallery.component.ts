import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {GalleryElement} from '../../../interfaces/investition.interface';
import {environment} from '../../../../environments/environment';
import {MovieElement} from '../../../interfaces/movie-element.interface';
import { Sortable } from 'sortablejs';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-standard-gallery',
  templateUrl: './standard-gallery.component.html',
  styleUrls: ['./standard-gallery.component.scss']
})
export class StandardGalleryComponent implements OnInit {
  @Input() galleryElements: GalleryElement[] = [];
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<GalleryElement[]> = new EventEmitter<GalleryElement[]>();
  webUrl: string = environment.WEB_URL;

  sortable: Sortable;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.createSortable();
  }

  createSortable(): void {
    this.sortable = new Sortable(this.document.getElementById('sortStandard'), {
      onEnd: (evt) => {
        const element = this.galleryElements[evt.oldIndex];
        this.galleryElements.splice(evt.oldIndex, 1);
        this.galleryElements.splice(evt.newIndex, 0, element);
      }
    });
  }

  onImageAdd(galleryElement: GalleryElement): void {
    this.galleryElements.push(galleryElement);
  }

  addMovie(movie: MovieElement): void {
    const galleryElement: GalleryElement =  {...{type: 'movie'}, ...movie};
    this.galleryElements.push(galleryElement);
  }

  updateGallery(): void {
    this.onAdd.emit(this.galleryElements);
  }

  removeElement(index: number): void {
    this.galleryElements.splice(index, 1);
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

}
