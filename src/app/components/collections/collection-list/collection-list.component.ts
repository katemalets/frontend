import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {CollectionService} from '../../../services/collection.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../interface/user';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor(private collectionService: CollectionService,
              private userService: UserService) { }

  url = '/collections';
  collections: Collection[];
  collection: Collection;

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getCollections(this.url).subscribe(data => {
      console.log(data);
      this.collections = data;
    });
  }
}
