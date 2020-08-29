import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  url = 'items';
  item: Item;
  tags: {id: number, name: string};
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(itemId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
        this.tags = this.item.tags;
      }
    );
  }
}
