import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressGalleryElement} from '../../../interfaces/investition.interface';
import {environment} from '../../../../environments/environment';
import {StandardGalleryComponent} from '../standard-gallery/standard-gallery.component';
import {Subscription} from 'rxjs';
import {ElementsOrderComponent} from '../../../tools/elements-order/elements-order.component';

@Component({
  selector: 'app-progress-gallery',
  templateUrl: './progress-gallery.component.html',
  styleUrls: ['./progress-gallery.component.scss']
})
export class ProgressGalleryComponent implements OnInit {
  @ViewChild('tempEdit', { read: ViewContainerRef })
  tempEdit: ViewContainerRef;
  @Input() progressGalleries: ProgressGalleryElement[] = [];
  @Output() onChange: EventEmitter<ProgressGalleryElement[]> = new EventEmitter<ProgressGalleryElement[]>();
  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  orderC: ComponentRef<ElementsOrderComponent>;

  webUrl: string = environment.WEB_URL;
  sortMode: boolean = false;

  progressSubscrption: Subscription;

  constructor(private cf: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  closeEdit(): void {
    if (this.sortMode){
      this.orderC.destroy();
      this.sortMode = false;
    }else {
      this.emitClose.emit();
    }
  }

  changeOrder(): void {
    this.tempEdit.clear();
    const c = this.cf.resolveComponentFactory(ElementsOrderComponent as Type<ElementsOrderComponent>);
    this.orderC = this.tempEdit.createComponent(c);
    this.orderC.instance.imagePathKey = 'imageThumb';
    this.orderC.instance.nameKey = 'name';
    this.orderC.instance.hasImage = true;
    this.orderC.instance.columns = '4';
    this.orderC.instance.elements = Object.create(this.progressGalleries);
    this.sortMode = true;
    this.progressSubscrption = this.orderC.instance.onChange.subscribe(data => {
      this.progressGalleries = data;
    });
  }

  onChangeElement(data: {element: ProgressGalleryElement, index: number}): void {
    this.progressGalleries[data.index] = data.element;
  }

  add(): void {
    this.progressGalleries.push({
      name: 'Nowa galeria',
      imageThumb: null,
      images: []
    });
  }

  remove(index: number): void {
    this.progressGalleries.splice(index, 1);
  }

  changeGallery(): void {
    this.onChange.emit(this.progressGalleries);
  }

}
