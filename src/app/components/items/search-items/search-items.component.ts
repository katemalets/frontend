import { Component, OnInit } from '@angular/core';
import {Item} from '../../../interface/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {

  items: Item[];
  searchMode = false;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>
    {
      this.getSelectedItems();
    });
  }

  getSelectedItems(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.getChosenItems();
    } else {
      this.getItems();
    }
  }

  getItems(): void{
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  getChosenItems(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    console.log('Searched items by keyword word = ' + keyword);
    this.itemService.searchItems(keyword).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }
}
