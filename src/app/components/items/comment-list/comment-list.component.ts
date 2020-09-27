import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../../../interface/comment';
import {User} from '../../../interface/user';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ItemService} from '../../../services/item.service';
import {Item} from '../../../interface/item';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  myForm: FormGroup;
  comment: Comment;
  itemId: number;
  tokenUserId: number;
  currentUser: User;
  item: Item;

  constructor(private commentService: CommentService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private tokenService: TokenStorageService,
              private itemService: ItemService,
              private router: Router) { }

  ngOnInit(): void {
    this.itemId = +this.route.snapshot.paramMap.get('id');
    this.currentUser = this.tokenService.getUser();
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.handleItemDetails();
    this.createForm();
  }

  private handleItemDetails() {
    this.itemService.getItem(this.itemId).subscribe(
      data => {
        this.item = data;
      }
    );
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
    this.commentService.createComment(comment, this.itemId, this.tokenUserId).subscribe( res => {
      console.log(comment.comment + ' added successfully');
      this.myForm.reset();
      this.comment = undefined;
      this.handleItemDetails();
    });
  }
}
