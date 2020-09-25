import {Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interface/user';
import {CollectionService} from '../../services/collection.service';
import {DataService} from '../../services/data.service';
import {Collection} from '../../interface/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  tokenUserId: number;
  userId: number;
  authorities: string[];
  message: string;

  constructor(private userService: UserService,
              private collectionService: CollectionService,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private data: DataService) {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
    this.data.currentMessage.subscribe(message => this.message = message);
    this.newMessage();
  }

  private handleUserDetails() {
    this.tokenUserId = this.token.getUser().id;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.authorities = this.token.getUser().authorities;
    for (const authority of this.authorities) {
      if (authority === 'ROLE_ADMIN') {
        if (this.userId !== 0) {
          this.tokenUserId = this.userId;
          console.log('Working from another user with id = ' + this.userId);
        }
      }
    }
    this.userService.getUserAccount(this.tokenUserId).subscribe(
      data => {
        this.user = data;
      });
  }

  deleteCollection(collection: Collection): void{
    this.collectionService.deleteCollection(collection).subscribe(data => {
        console.log('Deleting collection: ' + collection.name);
        this.handleUserDetails();
      }
    );
  }

  newMessage() {
    this.data.changeMessage(this.route.snapshot.paramMap.get('id'));
  }
}
