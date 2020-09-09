import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';
import {ActivatedRoute} from '@angular/router';
import {CollectionService} from '../../services/collection.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  url = '/collections';
  collection: Collection;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string
  };

  constructor(private collectionService: CollectionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.collectionService.getCollection(collectionId, this.url).subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
        this.items = this.collection.items;
        console.log(this.items);
      }
    );
  }
}
