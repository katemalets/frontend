import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {CollectionService} from '../../../services/collection.service';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor(private collectionService: CollectionService) { }

  url = '/collections';
  collections: Collection[];

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getCollections(this.url).subscribe(data => {
    //  console.log('Collections: ' + JSON.stringify(data));
      this.collections = data;
    });
  }
}
