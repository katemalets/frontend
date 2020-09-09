import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';
import {Item} from '../../interface/item';
import {Tag} from '../../interface/tag';
import {CollectionService} from '../../services/collection.service';
import {ItemService} from '../../services/item.service';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private collectionService: CollectionService,
              private itemService: ItemService,
              private tagService: TagService) { }

  collections: Collection;
  items: Item;
  tags: Tag;
  maxCollectionsNumber = 6;
  maxItemsNumber = 6;
  url = '/top';

  ngOnInit(): void {
    this.getTopCollections();
    this.getLastItems();
    this.getTags();
  }

  getTopCollections(): void{
    this.collectionService.getTopCollections(this.maxCollectionsNumber, this.url + '/collections').subscribe(data => {
     // console.log('Top collections' + JSON.stringify(data));
      this.collections = data;
    });
  }

  getLastItems(): void{
    this.itemService.getLastItems(this.maxItemsNumber, this.url + '/items').subscribe(data => {
     // console.log('Last Items' + JSON.stringify(data));
      this.items = data;
    });
  }

  getTags(): void{
    this.tagService.getTags( this.url + '/tags').subscribe( data => {
      this.tags = data;
    });
  }
}
