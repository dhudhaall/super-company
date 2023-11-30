import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  username:any= ''

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
    localStorage.clear();
  }
}
