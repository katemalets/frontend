import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this.httpClient.get(API_URL + url);
  }

  getOne(id: number, url: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + url + id);
  }

  updateCollection(id: number, value: any): Observable<any> {
    return this.httpClient.put(API_URL + 'collections/' + id, value, httpOptions);
  }
  // tslint:disable-next-line:typedef
  public deleteUser(user) {
    return this.httpClient.delete(API_URL + 'users' + '/' + user.id);
  }

  // tslint:disable-next-line:typedef
  blockUser(user) {
    return this.httpClient.put(API_URL + 'users' + '/block/' + user.id, user);
  }

  // tslint:disable-next-line:typedef
  unblockUser(user) {
    return this.httpClient.put(API_URL + 'users' + '/unblock/' + user.id, user);
  }

  // tslint:disable-next-line:typedef
  makeAdmin(user) {
    return this.httpClient.put(API_URL + 'users' + '/makeAdmin/' + user.id, user);
  }
}


