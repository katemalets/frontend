import {Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interface/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Array<User>;
  authorities: {id: number, authority: string};
  url = 'users';
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.get('admin').subscribe(data => {
      this.users = data;
      for (const user of this.users) {
        this.authorities = user.authorities;
       // console.log(this.authorities);
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        console.log('Deleting user: ' + user.username);
        this.users = this.users.filter(u => u !== user);
      });
  }

  blockUser(user: User): void {
    this.userService.blockUser(user)
      .subscribe( data => {
        console.log('Blocking user: ' + user.username);
        this.getUsers();
      });
  }

  unblockUser(user: User): void {
    this.userService.unblockUser(user)
      .subscribe( data => {
        console.log('Unblocking user: ' + user.username);
        this.getUsers();
      });
  }

  makeAdmin(user: User): void {
    this.userService.makeAdmin(user)
      .subscribe( data => {
        console.log('Making admin : ' + user.username);
        this.getUsers();
      });
  }
}
