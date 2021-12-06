import { SwitchLoadingProgressService } from './switch-loading-progress.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss'],
})
export class LoadingProgressComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private router: Router,
    private switchLoadingProgressService: SwitchLoadingProgressService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.switchLoadingProgressService.action$.subscribe((bool) => {
      if (bool) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    });
  }
}
