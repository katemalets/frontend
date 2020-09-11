import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../interface/item';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getLastItems(amount: number, url: string): Observable<Item[]>{
    return this.httpClient.get<Item[]>(API_URL + url + '/' + amount);
  }

  getItems(url: string): Observable<Item[]>{
    return this.httpClient.get<Item[]>(API_URL + url + '/');
  }

  getItem(itemId: number, url: string): Observable<Item> {
    return this.httpClient.get<Item>(API_URL + url + '/' + itemId);
  }

  deleteItem(item) {
    return this.httpClient.delete(API_URL + '/items' + '/' + item.id);
  }

  updateItem(id: number, value: any): Observable<Item> {
    return this.httpClient.put<Item>(API_URL + '/items' + '/' + id, value, httpOptions);
  }

  createItem(item, id: number){
    return this.httpClient.post(API_URL + '/items/collections' + '/' + id , item);
  }

  searchItems(keyword: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(API_URL + '/items/search' + '/' + keyword);
  }

  likeItem(item, userId: number) {
    return this.httpClient.put(API_URL + '/items' + '/' + userId + '/like' + '/' + item.id, item);
  }

  dislikeItem(item, userId: number) {
    return this.httpClient.put(API_URL + '/items' + '/' + userId + '/dislike' + '/' + item.id, item);
  }
}
