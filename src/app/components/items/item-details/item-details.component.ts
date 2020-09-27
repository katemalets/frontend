import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Collection} from '../../../interface/collection';
import {CollectionService} from '../../../services/collection.service';
import {User} from '../../../interface/user';
import {UserService} from '../../../services/user.service';
import {Tag} from '../../../interface/tag';
import {TagService} from '../../../services/tag.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../services/comment.service';
import {Comment} from '../../../interface/comment';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  myForm: FormGroup;
  comment: Comment;
  tokenUserId: number;
  userId: number;
  authorities: string[];
  collectionId: number;
  collection: Collection;
  currentUser: User;
  item: Item;
  userLiked: boolean;
  itemId: number;

  constructor(private itemService: ItemService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private tagService: TagService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router,
              private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.handleItemDetails();
    this.itemId = +this.route.snapshot.paramMap.get('id');
    this.currentUser = this.tokenService.getUser();
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.handleItemDetails();
  }

  private handleItemDetails() {
    this.itemService.getItem(this.itemId).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
        // @ts-ignore
        console.log('Tags number ' + this.item.tags.length);
        this.collectionId = this.item.collectionId;
        this.handleCollectionDetails(this.collectionId);
        for (const userId of this.item.usersWhoLikedIds) {
          if (userId === this.tokenUserId) {
            this.userLiked = true;
            console.log(userId + ' liked this item');
            console.log('----> people who liked = ' + this.item.usersWhoLikedIds);
          }
        }
        if (!this.userLiked){
          console.log('----> people who liked = ' + this.item.usersWhoLikedIds);
          this.userLiked = false;
        }
      }
    );
  }

  private handleCollectionDetails(collectionId: number) {
    this.collectionService.getCollection(collectionId).subscribe(
      data => {
        this.collection = data;
        this.checkAuthority();
      }
    );
  }

  private checkAuthority(){
    this.authorities = this.tokenService.getUser().authorities;
    for (const authority of this.authorities) {
      if (authority === 'ROLE_ADMIN') {
        console.log(authority);
        this.userId = this.collection.userId;
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
  likeItem(item: Item): void {
    console.log('Id of liked person:' + this.tokenUserId);
    this.itemService.likeItem(item, this.tokenUserId).subscribe(data => {
      console.log('Liked item : ' + item.name);
      this.handleItemDetails();
      this.userLiked = true;
    });
  }

  dislikeItem(item: Item): void{
    this.itemService.dislikeItem(item, this.tokenUserId).subscribe(data => {
      console.log('Disliked item : ' + item.name);
      this.handleItemDetails();
      this.userLiked = false;
    });
  }
}
