import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../../interface/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item;
  myForm: FormGroup;

  constructor(private itemService: ItemService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(this.item ? this.item.name : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : '', Validators.required),
      imageURL: new FormControl(this.item ? this.item.imageURL : '', Validators.required)
    });
    console.log(this.myForm);
  }

  submitForm(data: FormGroup) {
    if (data.valid) {
      console.log(data);
      this.addItem(data.value);
    }
  }

  addItem(item: Item): void {
    const collectionId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.createItem(item, collectionId).subscribe(res => {
     // const response = JSON.parse(JSON.stringify(res));
     // this.getData()
      console.log(item);
      console.log('item added successfully');
      this.myForm.reset();
      this.item = undefined;
    }, error => {
    });
  }
}
