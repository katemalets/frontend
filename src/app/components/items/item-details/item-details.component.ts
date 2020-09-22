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

  tokenUserId: number;
  userId: number;
  authorities: string[];
  collectionId: number;
  collection: Collection;
  currentUser: User;
  url = '/items';
  item: Item;
  items: Item[];
  userLiked: boolean;
  comment: Comment;
  myForm: FormGroup;

  constructor(private itemService: ItemService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private tagService: TagService,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.handleItemDetails();
    this.createForm();
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(itemId, this.url).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
       // this.comments = this.item.comments;
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
    this.itemService.getItems('/items').subscribe(
      data => {
        this.items = data;
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





  deleteTag(tag: Tag): void{
    this.tagService.deleteTag(tag.id, this.item.id).subscribe(data => {
      console.log('Deleting tag' + tag.name);
    });
    this.handleItemDetails();
  }


  private createForm() {
    this.myForm = this.formBuilder.group({
      comment: new FormControl(this.comment ? this.comment.comment : '', Validators.required)
      }
    );
  }

  submitForm(data: FormGroup) {
    if (data.valid){
      this.addComment(data.value);
    }
    console.log(data);
  }

  addComment(comment: Comment) {
    const itemId = +this.route.snapshot.paramMap.get('id');
    this.commentService.createComment(comment, itemId, this.tokenUserId).subscribe( res => {
      console.log(comment.comment + ' added successfully');
      this.myForm.reset();
      this.comment = undefined;
    });
  }
}
