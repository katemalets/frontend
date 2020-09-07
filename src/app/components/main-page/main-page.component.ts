import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  urlCollection = 'collections';
  collections: Array<Collection>;
  items: Array<Item>;

  ngOnInit(): void {
    this.getCollections();
    this.getItems();
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

}
