import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {DataService} from '../../../services/data.service';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  tokenUserId: number;
  userId: number;
  authorities: string[];
  collection: Collection;
  item: Item;
  message: string;
  currentId: number;
  file: File;

  constructor(private collectionService: CollectionService,
              private tokenService: TokenStorageService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private data: DataService)
  {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.tokenUserId = this.tokenService.getUser().id;
    }
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log('Current user id - ' + this.message + ' (if 0/null - from admin)');
    this.currentId = +this.message;
  }

  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.collectionService.getCollection(collectionId).subscribe(
      data => {
        this.collection = data;
        this.checkAuthority();
      }
    );
  }

  private checkAuthority(){
    this.authorities = this.tokenService.getUser().authorities;
    for (const authority of this.authorities) {
      if (authority === 'ROLE_ADMIN') {
        this.userId = this.collection.userId;
      }
    }
  }

  deleteCollection(collection: Collection): void{
    this.collectionService.deleteCollection(collection).subscribe(data => {
        console.log('Deleting collection: ' + collection.name);
        this.handleCollectionDetails();
        this.router.navigateByUrl('account');
      }
    );
  }

  addCollection(collection: Collection): void{
    if (this.currentId === 0){
      this.currentId = this.tokenUserId;
    }
    this.collectionService.addCollection(this.collection.id, this.currentId).subscribe( data => {
      this.handleCollectionDetails();
      this.router.navigateByUrl('account');
    });
    console.log('Collection ' + collection.name + ' added for user #' + this.currentId);
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(itemId).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
        this.handleCollectionDetails();
      }
    );
  }

  deleteItem(item: Item): void{
    this.itemService.deleteItem(item).subscribe(data => {
        console.log('Deleting item: ' + item.name);
        this.handleItemDetails();
        this.router.navigateByUrl('/collections' + '/' + this.collection.id);
      }
    );
  }

  onSelect(event) {
    this.file = event.addedFiles;
    console.log(this.file);
  }
}
