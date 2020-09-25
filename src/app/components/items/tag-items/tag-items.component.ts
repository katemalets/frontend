import { Component, OnInit } from '@angular/core';
import {Tag} from '../../../interface/tag';
import {ActivatedRoute} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';
import {TagService} from '../../../services/tag.service';
import {Item} from '../../../interface/item';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent implements OnInit {

  items: Item[];

  constructor(private tagService: TagService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(): void{
    const tagId: number = +this.route.snapshot.paramMap.get('id');
    this.tagService.getItems(tagId).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }
}
