import { Component, OnInit } from '@angular/core';
import {Collection} from '../../interface/collection';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  item: Item;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(itemId, 'items/update/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  updateItem() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.item);
    this.userService.updateItem(id, this.item)
      .subscribe( data => {
        console.log(this.item);
      });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.updateItem();
  }

}
