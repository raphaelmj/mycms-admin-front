import { ImageGallery } from './../../interfaces/image-gallery.interface';
import { environment } from './../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Sortable } from 'sortablejs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-drop-image',
  templateUrl: './drop-image.component.html',
  styleUrls: ['./drop-image.component.scss'],
})
export class DropImageComponent implements OnInit {
  @Input() gallery: ImageGallery[];
  @Output() emitChangeGallery: EventEmitter<ImageGallery[]> = new EventEmitter<
    ImageGallery[]
  >();
  webUrl: string = environment.WEB_URL;
  sortable: Sortable;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.createSortable();
  }

  createSortable() {
    this.sortable = new Sortable(this.document.getElementById('sortImages'), {
      // Element dragging ended
      onEnd: function (/**Event*/ evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.gallery[evt.oldIndex];
        this.gallery.splice(evt.oldIndex, 1);
        this.gallery.splice(evt.newIndex, 0, element);
        this.emitChange();
      }.bind(this),
    });
  }

  getImage(event: ImageGallery) {
    this.gallery.push(event);
    this.emitChange();
  }

  removeImage(i: number) {
    this.gallery.splice(i, 1);
    this.emitChange();
  }

  emitChange() {
    this.emitChangeGallery.emit(this.gallery);
  }
}
