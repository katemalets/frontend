import {Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../interface/user';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        console.log('Deleting user: ' + user.username);
        if (this.tokenService.getUser().id === user.id){
          console.log('------> Current admin deleted himself');
          this.tokenService.signOut();
          window.location.reload();
        } else {
          this.users = this.users.filter(u => u !== user);
        }
      });
  }

  blockUser(user: User): void {
    this.userService.blockUser(user)
      .subscribe( data => {
        console.log('Blocking user: ' + user.username);
        if (this.tokenService.getUser().id === user.id){
          console.log('------> Current admin blocked himself');
          this.tokenService.signOut();
          window.location.reload();
        } else {
          this.getUsers();
        }
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
