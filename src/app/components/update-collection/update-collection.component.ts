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

  collection: Collection;

  constructor(private userService: UserService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  private handleCollectionDetails() {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(collectionId, 'collections/update/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.collection = data;
      }
    );
  }

  updateCollection() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.collection);
    this.userService.updateCollection(id, this.collection)
      .subscribe( data => {
        console.log('collection ' + this.collection.name + ' updated');
      });
  }

  onSubmit() {
    this.updateCollection();
    this.router.navigateByUrl('home');
  }
}
