import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';
import {Item} from '../../interface/item';
import {Tag} from '../../interface/tag';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  collections: Array<Collection>;
  items: Array<Item>;
  tags: Array<Tag>;

  ngOnInit(): void {
    this.getCollections();
    this.getItems();
    this.getTags();
  }

  getCollections(): void {
    this.userService.get('top/collections').subscribe(data => {
      //  console.log('Collections: ' + JSON.stringify(data));
      this.collections = data;
    });
  }

  getItems(): void{
    this.userService.get('top/items').subscribe(data => {
      this.items = data;
      console.log('general items' + JSON.stringify(data));
    });
  }

  getTags(): void{
    this.userService.get('top/tags').subscribe( data => {
      this.tags = data;
    });
  }

}
