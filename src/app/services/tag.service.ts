import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../interface/tag';
import {Collection} from '../interface/collection';
import {Item} from '../interface/item';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getTags(): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(API_URL + '/tags');
  }

  deleteTag(tagId: number, itemId: number) {
    return this.httpClient.delete(API_URL + '/tags' + '/' + tagId + '/items' + '/' + itemId);
  }

  createTag(tag, itemId: number) {
    return this.httpClient.post(API_URL + '/tags/items' + '/' + itemId , tag);
  }

  getItems(tagId: number) {
    return this.httpClient.get<Item[]>(API_URL + '/tags/top/items/' + tagId );
  }
}
