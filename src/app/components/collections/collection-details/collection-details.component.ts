import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  tokenUserId: number;
  userId: number;
  authorities: string[];
  url = '/collections';
  collection: Collection;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string
  };

  message: string;
  currentId: number;

  constructor(private collectionService: CollectionService,
              private tokenService: TokenStorageService,
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
    console.log(this.tokenUserId);
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log('current user ' + this.message);
    this.currentId = +this.message;
  }

  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.collectionService.getCollection(collectionId, this.url).subscribe(
      data => {
        this.collection = data;
        this.items = this.collection.items;
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

  deleteCollection(collection: Collection): void{
    this.collectionService.deleteCollection(collection).subscribe(data => {
        console.log('Deleting collection: ' + collection.name);
        this.handleCollectionDetails();
        this.router.navigateByUrl('collections');
      }
    );
  }

  addCollection(collection: Collection): void{
    console.log('Adding collection ' + collection.name);
    this.collectionService.addCollection(this.collection.id, this.currentId).subscribe( data => {
      console.log('For user : ' + this.userId);
      console.log('Token user: ' + this.tokenUserId);
      this.handleCollectionDetails();
      this.router.navigateByUrl('account');
    });
  }
}
