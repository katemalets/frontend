import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Tag} from '../../interface/tag';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent implements OnInit {

  tag: Tag;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(): void{
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(collectionId, 'top/tags/').subscribe(data => {
      this.tag = data;
      this.items = this.tag.items;
      console.log('Data =' + JSON.stringify(data));
    });
  }
}
