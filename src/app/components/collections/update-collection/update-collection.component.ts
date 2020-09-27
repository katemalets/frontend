import { Component, OnInit } from '@angular/core';
import {Collection} from '../../../interface/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../../services/collection.service';
import {FormGroup} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {

  collection: Collection;
  collectionId: number;
  file: File;

  constructor(private collectionService: CollectionService,
              private route: ActivatedRoute,
              private router: Router,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.collectionId = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(() => {
      this.handleCollectionDetails();
    });
  }

  private handleCollectionDetails() {
    this.collectionService.getCollection(this.collectionId).subscribe(
      data => {
        this.collection = data;
      }
    );
  }

  updateCollection() {
    console.log(this.collection);
    this.collectionService.updateCollection(this.collectionId, this.collection)
      .subscribe( data => {
        console.log('collection ' + this.collection.name + ' updated');
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
      this.updateCollection();
    } else {
      const fileData = this.file[0];
      data.append('file', fileData);
      data.append('upload_preset', 'jbaom1cx');
      data.append('cloud_name', 'katemalets');
      this.uploadService.uploadImage(data).subscribe((response) => {
        if (response) {
          console.log(response);
        }
        this.collection.imageURL = response.url;
        this.updateCollection();
      });
    }
  }
}
