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

  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this.httpClient.get(API_URL + url);
  }

  getOne(id: number, url: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + url + id);
  }

  updateItem(id: number, value: any): Observable<any> {
    return this.httpClient.put(API_URL + 'items/' + id, value, httpOptions);
  }

  updateCollection(id: number, value: any): Observable<any> {
    return this.httpClient.put(API_URL + 'collections/' + id, value, httpOptions);
  }

  public deleteUser(user) {
    return this.httpClient.delete(API_URL + 'users' + '/' + user.id);
  }

  blockUser(user) {
    return this.httpClient.put(API_URL + 'users' + '/block/' + user.id, user);
  }

  unblockUser(user) {
    return this.httpClient.put(API_URL + 'users' + '/unblock/' + user.id, user);
  }

  makeAdmin(user) {
    return this.httpClient.put(API_URL + 'users' + '/makeAdmin/' + user.id, user);
  }

  deleteCollection(collection) {
    return this.httpClient.delete(API_URL + 'collections/' + collection.id);
  }

  deleteItem(item) {
    return this.httpClient.delete(API_URL + 'items/' + item.id);
  }

  createItem(item, id: number){
    return this.httpClient.post(API_URL + 'items/collections/' + id , item);
  }


}


