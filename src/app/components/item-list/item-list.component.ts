import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Collection} from '../../interface/collection';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  url = 'collections';
  collection: Collection;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(collectionId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
        this.items = this.collection.items;
        console.log(this.collection);
        console.log(this.items);
      }
    );
  }

  deleteItem(item: Item): void{
    this.userService.deleteItem(item).subscribe(data => {
        console.log('Deleting item: ' + item.name);
        this.handleItemDetails();
      }
    );
  }
}
