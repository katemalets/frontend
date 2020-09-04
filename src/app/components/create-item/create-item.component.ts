import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../interface/item';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item = undefined;
  myForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  // tslint:disable-next-line:typedef
  private createForm() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(this.item ? this.item.name : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : '', Validators.required),
      imageURL: new FormControl(this.item ? this.item.imageURL : '', Validators.required)
    });
    console.log(this.myForm);
  }

  // tslint:disable-next-line:typedef
  submitForm(data: FormGroup) {
    if (data.valid) {
      console.log(data);
      this.addItem(data.value);
    }
  }

  addItem(item: Item): void {
    this.userService.createItem(item).subscribe(res => {
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
