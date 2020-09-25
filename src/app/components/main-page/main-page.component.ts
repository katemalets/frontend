import { Component, OnInit } from '@angular/core';
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

  collections: Collection[];
  items: Item[];
  tags: Tag[];
  maxCollectionsNumber = 6;
  maxItemsNumber = 6;

  ngOnInit(): void {
    this.getTopCollections();
    this.getLastItems();
    this.getTags();
  }

  getTopCollections(): void{
    this.collectionService.getTopCollections(this.maxCollectionsNumber, '/collections').subscribe(data => {
      this.collections = data;
    });
  }

  getLastItems(): void{
    this.itemService.getLastItems(this.maxItemsNumber, '/items').subscribe(data => {
      this.items = data;
    });
  }

  getTags(): void{
    this.tagService.getTags( '/tags').subscribe( data => {
      this.tags = data;
    });
  }
}
