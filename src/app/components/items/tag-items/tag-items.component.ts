import { Component, OnInit } from '@angular/core';
import {Tag} from '../../../interface/tag';
import {ActivatedRoute} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent implements OnInit {

  tag: Tag;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string
  };

  constructor(private collectionService: CollectionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(): void{
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.collectionService.getCollection(collectionId, '/top/tags').subscribe(data => {
      this.tag = data;
      this.items = this.tag.items;
      console.log('Data =' + JSON.stringify(data));
    });
  }
}
