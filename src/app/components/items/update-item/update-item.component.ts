import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';
import {UploadService} from '../../../services/upload.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  item: Item;
  file: File;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    const itemId: number = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(itemId, '/items/update').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.item = data;
      }
    );
  }

  updateItem() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(this.item);
    console.log('trying to change item');
    this.itemService.updateItem(id, this.item)
      .subscribe( data => {

        console.log(this.item);
      });
  }

  onSubmit() {
    this.uploadImage();
  }

  onSelect(event) {
    this.file = event.addedFiles;
    console.log(this.file);
  }

  uploadImage(): void {
    const data = new FormData();
    if (this.file === undefined){
      console.log('decide not to change photo');
      this.updateItem();
    } else {
      const fileData = this.file[0];
      data.append('file', fileData);
      data.append('upload_preset', 'jbaom1cx');
      data.append('cloud_name', 'katemalets');
      this.uploadService.uploadImage(data).subscribe((response) => {
        if (response) {
          console.log(response);
        }
        this.item.imageURL = response.url;
        this.updateItem();
      });
    }
  }
}
