import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection} from '../interface/collection';

const API_URL = 'http://localhost:8080/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private httpClient: HttpClient) { }

  getTopCollections(amount: number): Observable<Collection[]>{
    return  this.httpClient.get<Collection[]>(API_URL + '/collections/top' + '/' + amount);
  }

  getCollection(id: number): Observable<Collection> {
    return this.httpClient.get<Collection>(API_URL + '/collections' + '/' + id);
  }

  getCollections(url: string): Observable<Collection[]> {
    return this.httpClient.get<Collection[]>(API_URL + url);
  }

  deleteCollection(collection) {
    return this.httpClient.delete(API_URL + '/collections' + '/' + collection.id);
  }

  updateCollection(id: number, value: any): Observable<Collection> {
    return this.httpClient.put<Collection>(API_URL + '/collections' + '/' + id, value, httpOptions);
  }

  addCollection(collectionId: number, userId: number) {
    return this.httpClient.get(API_URL + '/collections/' + collectionId + '/' + userId);
  }
}
