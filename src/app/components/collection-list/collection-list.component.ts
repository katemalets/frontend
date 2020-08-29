import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor(private userService: UserService) { }

  url = 'collections';
  collections: Array<Collection>;

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.userService.get(this.url).subscribe(data => {
    //  console.log('Collections: ' + JSON.stringify(data));
      this.collections = data;
    });
  }

}
