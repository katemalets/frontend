import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  item: Item;

  constructor(private userService: UserService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(itemId, 'items/update/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
      }
    );
  }

  updateItem() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.item);
    this.userService.updateItem(id, this.item)
      .subscribe( data => {
        console.log(this.item);
      });
  }

  onSubmit() {
    this.updateItem();
    this.router.navigateByUrl('home');
  }

}
