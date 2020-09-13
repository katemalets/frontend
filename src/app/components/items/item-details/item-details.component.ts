import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Collection} from '../../../interface/collection';
import {CollectionService} from '../../../services/collection.service';
import {User} from '../../../interface/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  tokenUserId: number;
  userId: number;
  authorities: string[];
  collectionId: number;
  collection: Collection;
  currentUser: User;
  userLiked: boolean;
  url = '/items';
  item: Item;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    collection: number;
    likesNumber: number;
  };
  tags: {
    id: number;
    name: string
  };

  constructor(private itemService: ItemService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(itemId, this.url).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
        this.tags = this.item.tags;
        this.collectionId = this.item.collection;
        this.userLiked = this.item.userLiked;
        this.handleCollectionDetails(this.collectionId);
      }
    );
  }

  private handleCollectionDetails(collectionId: number) {
    this.collectionService.getCollection(collectionId, '/collections').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
      //  this.items = this.collection.items;
        this.checkAuthority();
      }
    );
  }

  private checkAuthority(){
    this.authorities = this.tokenService.getUser().authorities;
    for (const authority of this.authorities) {
      if (authority === 'ROLE_ADMIN') {
        console.log(authority);
        this.userId = this.collection.user;
        console.log('userId = ' + this.userId);
      }
    }
  }

  deleteItem(item: Item): void{
    this.itemService.deleteItem(item).subscribe(data => {
        console.log('Deleting item: ' + item.name);
        this.handleItemDetails();
        this.router.navigateByUrl('/collections' + '/' + this.collection.id);
      }
    );
  }
 //toDo resolve like system!
  likeItem(item: Item): void {
    console.log('Id of liked person:' + this.tokenUserId);
    this.itemService.likeItem(item, this.tokenUserId).subscribe(data => {
      console.log('Liked item : ' + item.name);
      this.handleItemDetails();
    });
  }

  dislikeItem(item: Item): void{
    this.itemService.dislikeItem(item, this.tokenUserId).subscribe(data => {
      console.log('Disliked item : ' + item.name);
      this.handleItemDetails();
    });
  }
}
