import { Component, OnInit } from '@angular/core';
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

  url = 'users';
  user: User;
  tokenUserId: number;
  userId: number;
  collections: {
    name: string;
    topic: string;
    imageURL: string;
    description: string
  };

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
    // tslint:disable-next-line:triple-equals
    if (this.userId !== 0){
      this.tokenUserId = this.userId;
    }
    this.userService.getUser(this.tokenUserId).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.user = data;
      }
    );
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
