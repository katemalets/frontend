import { Component } from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authorities: string[];
  private collections: string[];
  private images: string[];
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
      this.collections = user.collections;
      this.showAdminBoard = this.authorities.includes('ROLE_ADMIN');
      this.username = user.username;
      this.images = user.images;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
