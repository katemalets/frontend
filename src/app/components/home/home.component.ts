import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interface/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private token: TokenStorageService) { }

  url = 'users';
  user: User;
  collections: { name: string, topic: string, imageURL: string, description: string};

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleUserDetails() {
    const userId = this.token.getUser().id;
    this.userService.getOne(userId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.user = data;
      }
    );
  }
}
