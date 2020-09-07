import {Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interface/user';
import {TokenStorageService} from '../../services/token-storage.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Array<User>;
  authorities: {id: number, authority: string};
  url = 'users';
  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private router: Router) {
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
        if (this.tokenService.getUser().id === user.id){
          console.log('------> equals!!!');
          this.tokenService.signOut();
          this.router.navigateByUrl('main');
        } else {
          console.log('Everything is okey');
        }
      });
  }

  blockUser(user: User): void {
    this.userService.blockUser(user)
      .subscribe( data => {
        console.log('Blocking user: ' + user.username);
        this.getUsers();
        if (this.tokenService.getUser().id === user.id){
          console.log('------> equals!!!');
          this.tokenService.signOut();
          this.router.navigateByUrl('main');
        } else {
          console.log('Everything is okey');
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
