import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {

  collection: Collection;

  constructor(private collectionService: CollectionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.collectionService.getCollection(collectionId, '/collections/update').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
      }
    );
  }

  updateCollection() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.collection);
    this.collectionService.updateCollection(id, this.collection)
      .subscribe( data => {
        console.log('collection ' + this.collection.name + ' updated');
      });
  }

  onSubmit() {
    this.updateCollection();
  }
}
