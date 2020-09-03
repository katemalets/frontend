import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Collection} from '../../interface/collection';
import {User} from '../../interface/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  url = 'users';
  user: User;
  collections: { name: string, topic: string, imageURL: string};

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleUserDetails() {
    const userId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getOne(userId, this.url + '/').subscribe(
      data => {
        //  console.log(('Data: ' + JSON.stringify(data)));
        this.user = data;
      }
    );
  }
}
