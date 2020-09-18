import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tag} from '../../../interface/tag';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {

  tag: Tag;
  myForm: FormGroup;

  constructor(private tagService: TagService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(this.tag ? this.tag.name : '', Validators.required)
    }
  );
    console.log(this.myForm);
  }

  submitForm(data: FormGroup) {
    if (data.valid){
      this.addTag(data.value);
    }
    console.log(data);
  }

  addTag(tag: Tag) {
    const itemId = +this.route.snapshot.paramMap.get('id');
    this.tagService.createTag(tag, itemId).subscribe( res => {
      console.log(tag.name + ' added successfully');
      this.myForm.reset();
      this.tag = undefined;
    });
  }
}
