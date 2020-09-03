import { Component, OnInit } from '@angular/core';
import {Collection} from '../../interface/collection';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {

 // id: number;
  collection: Collection;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(collectionId, 'collections/update/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  updateCollection() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.collection);
    this.userService.updateCollection(id, this.collection)
      .subscribe( data => {
        console.log(this.collection);
      });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.updateCollection();
  }
}
