import { Component, OnInit } from '@angular/core';
import {Item} from '../../interface/item';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {

  url: 'items';
  items: Array<Item>;
  searchMode = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>
    {
      this.getSelectedItems();
    });
  }

  getSelectedItems(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log('search mode = ' + this.searchMode);
    if (this.searchMode){
      this.getChosenItems();
    } else {
      this.getItems();
    }
  }

  getItems(): void{
    this.userService.get('items').subscribe(data => {
    this.items = data;
    console.log('general items' + this.items);
    });
  }

  getChosenItems(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    console.log('keyword = ' + keyword);
    this.userService.searchItems(keyword).subscribe(data => {
      this.items = data;
      console.log('chosen items' + this.items);
    });
  }
}
