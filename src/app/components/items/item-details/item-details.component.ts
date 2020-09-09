import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Collection} from '../../../interface/collection';
import {CollectionService} from '../../../services/collection.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  tokenUserId: number;
  userId: number;
  authorities: string[];
  collectionId: number;
  collection: Collection;
  url = '/items';
  item: Item;
  tags: {
    id: number;
    name: string
  };

  constructor(private itemService: ItemService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private collectionService: CollectionService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(itemId, this.url).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
        this.tags = this.item.tags;
        this.collectionId = this.item.collection;
        console.log('collectionId = ' + this.collectionId);
        this.handleCollectionDetails(this.collectionId);
      }
    );
  }

  private handleCollectionDetails(collectionId: number) {
    this.collectionService.getCollection(collectionId, '/collections').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
      //  this.items = this.collection.items;
        this.checkAuthority();
      }
    );
  }

  private checkAuthority(){
    this.authorities = this.tokenService.getUser().authorities;
    for (const authority of this.authorities) {
      if (authority === 'ROLE_ADMIN') {
        console.log(authority);
        this.userId = this.collection.user;
        console.log('userId = ' + this.userId);
      }
    }
  }


  deleteItem(item: Item): void{
    this.itemService.deleteItem(item).subscribe(data => {
        console.log('Deleting item: ' + item.name);
        this.handleItemDetails();
        this.router.navigateByUrl('/collections' + '/' + this.collection.id);
      }
    );
  }
}
