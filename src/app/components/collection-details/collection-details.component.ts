import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Collection} from '../../interface/collection';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  url = 'collections';
  collection: Collection;
  items: { id: number; name: string; description: string; imageURL: string };

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(collectionId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
        this.items = this.collection.items;
        console.log(this.items);
      }
    );
  }
}
