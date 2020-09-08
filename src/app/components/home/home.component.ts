import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interface/user';
import {Collection} from '../../interface/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url = 'users';
  user: User;
  userId: number;
  id: number;
  collections: {
    name: string;
    topic: string;
    imageURL: string;
    description: string
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
  }

  private handleUserDetails() {
    this.userId = this.token.getUser().id;
    this.id = +this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:triple-equals
    if (this.id !== 0){
      this.userId = this.id;
    }
    this.userService.getOne(this.userId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.user = data;
      }
    );
  }

  deleteCollection(collection: Collection): void{
    this.userService.deleteCollection(collection).subscribe(data => {
      console.log('Deleting collection: ' + collection.name);
      this.handleUserDetails();
      }
    );
  }
}
