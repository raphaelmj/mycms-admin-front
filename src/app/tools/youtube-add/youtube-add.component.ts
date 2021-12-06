import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MovieElement} from '../../interfaces/movie-element.interface';
import {ModalImageCreatorService} from '../../services/modal/modal-image-creator.service';
import {Subscription} from 'rxjs';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-youtube-add',
  templateUrl: './youtube-add.component.html',
  styleUrls: ['./youtube-add.component.css']
})
export class YoutubeAddComponent implements OnInit {
  @Output() onAdd: EventEmitter<MovieElement> = new EventEmitter<MovieElement>();
  @ViewChild('embedVideo') embedVideo: ElementRef;
  movie: MovieElement = {
    movieSelector: null,
    src: null,
    thumb: null
  };
  safeSrc: SafeResourceUrl;
  thumMovieImageSource: string = null;
  listImageSubscription: Subscription;
  disabled: boolean = true;

  constructor(
    private sanitizer: DomSanitizer,
    private modalImageCreatorService: ModalImageCreatorService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.movieSelector);
  }

  movieYTChange(): void {
    this.checkIsComplateData();
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.movieSelector);
  }

  addImage(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 0.7,
      resizeToWidth: 500,
      format: 'jpg',
      maintainAspectRatio: true
    }).subscribe(data => {
      if (data) {
        this.thumMovieImageSource = data.source;
        this.checkIsComplateData();
      }
    });
  }

  checkIsComplateData(): void {
    this.disabled = !(this.movie.movieSelector && this.thumMovieImageSource);
  }

  addMovie(): void {
    this.imageService.uploadCropped(this.thumMovieImageSource, 'jpg', 'youtube').subscribe(image => {
      this.movie.src = image.src;
      this.onAdd.emit(this.movie);
      this.thumMovieImageSource = null;
    });
  }

}
