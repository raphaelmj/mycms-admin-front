import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from './../login/reducers/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  constructor(protected store: Store<AuthState>) {}

  ngOnInit(): void {}
}
