import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interface/user';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // toDo create folder collection/items etc
  getUsers(url: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + url);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(API_URL + '/users' + '/' + id);
  }

  public deleteUser(user) {
    return this.httpClient.delete(API_URL + '/users' + '/' + user.id);
  }

  blockUser(user) {
    return this.httpClient.put(API_URL + '/users' + '/block' + '/' + user.id, user);
  }

  unblockUser(user) {
    return this.httpClient.put(API_URL + '/users' + '/unblock' + '/' + user.id, user);
  }

  makeAdmin(user) {
    return this.httpClient.put(API_URL + '/users' + '/makeAdmin' + '/' + user.id, user);
  }
}


