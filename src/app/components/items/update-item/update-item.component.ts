import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../interface/item';
import {ItemService} from '../../../services/item.service';
import {UploadService} from '../../../services/upload.service';
import {Tag} from '../../../interface/tag';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  item: Item;
  file: File;
  itemId: number;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private uploadService: UploadService,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.itemId = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(() => {
      this.handleItemDetails();
    });
  }

  private handleItemDetails() {
    this.itemService.getItem(this.itemId, '/items/update').subscribe(
      data => {
        this.item = data;
      }
    );
  }

  updateItem() {
    this.itemService.updateItem(this.itemId, this.item)
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
      console.log(' user did not change photo');
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

  deleteTag(tag: Tag): void{
    this.tagService.deleteTag(tag.id, this.item.id).subscribe(data => {
      console.log('Deleting tag' + tag.name);
    });
    this.router.navigateByUrl('/items/' + this.itemId);
  }
}
