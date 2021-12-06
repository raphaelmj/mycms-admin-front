import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomTableInfoAssets} from '../../../../../interfaces/investition.interface';
import {environment} from '../../../../../../environments/environment';
import {ModalImageCreatorService} from '../../../../../services/modal/modal-image-creator.service';
import {ImageService} from '../../../../../services/image.service';
import {concatMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export type AssetType = 'situaPlan' | 'buildingLocation' | 'plan';

@Component({
  selector: 'app-info-assets',
  templateUrl: './info-assets.component.html',
  styleUrls: ['./info-assets.component.css']
})
export class InfoAssetsComponent implements OnInit, OnDestroy {
  @Input() infoAssets: CustomTableInfoAssets;
  @Input() index: number;
  @Output() onChange: EventEmitter<{index: number, data: CustomTableInfoAssets}> = new EventEmitter<{index: number, data: CustomTableInfoAssets}>();
  webUrl: string = environment.WEB_URL;
  imageSubscription: Subscription;

  constructor(
    private modalImageCreatorService: ModalImageCreatorService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

  editImage(assetType: AssetType): void {
    this.imageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 1,
      format: 'jpg',
      maintainAspectRatio: false,
      bundleData: assetType
    })
      .pipe(concatMap(data => this.imageService.uploadCropped(data.source, 'jpg', 'custom-table')))
      .subscribe(data => {
      this.infoAssets[assetType] = data;
      this.onChange.emit({index: this.index, data: this.infoAssets});
    });
  }


  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }

}
