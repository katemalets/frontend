import { Component } from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authorities: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(this.tokenStorageService.getUser());
      this.authorities = user.authorities;
      this.showAdminBoard = this.authorities.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
