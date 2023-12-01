import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../home/state/home.state';
import * as HomeActions from '../home/actions/home.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  username:any= ''

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('username')!)
  }
  state: string = 'close';
  isExpandTrue = false

  toggleState() {
    this.state = this.state === 'close' ? 'open' : 'close';
  }

  expand() {
    this.isExpandTrue = !this.isExpandTrue
  }

  logout() {
    this.store.dispatch(HomeActions.resetSunriseData());
    localStorage.clear();
  }
}
