import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../../interface/item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {UploadService} from '../../../services/upload.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item;
  myForm: FormGroup;
  file: File;
  collectionId: number;
  imageName: '';

  constructor(private itemService: ItemService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private cloudinary: Cloudinary,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.collectionId = +this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  uploadImage(item: FormGroup): void {
  const data = new FormData();
  const fileData = this.file[0];
  data.append('file', fileData);
  data.append('upload_preset', 'jbaom1cx');
  data.append('cloud_name', 'katemalets');
  this.uploadService.uploadImage(data).subscribe((response) => {
    if (response) {
      console.log(response);
    }
    this.imageName = response.url;
    if (item.valid) {
      console.log(item + 'saved');
      this.addItem(item.value);
    }
  });
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(this.item ? this.item.name : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : '', Validators.required),
    });
    console.log(this.myForm);
  }

  submitForm(data: FormGroup) {
    this.uploadImage(data);
  }

  addItem(item: Item): void {
    item.imageURL = this.imageName;
    this.itemService.createItem(item, this.collectionId).subscribe(res => {
      console.log(item);
      console.log('item added successfully');
      this.myForm.reset();
      this.item = undefined;
    }, error => {
    });
  }

  onSelect(event) {
    this.file = event.addedFiles;
    console.log(this.file);
  }
}
