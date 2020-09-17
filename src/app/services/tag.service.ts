import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../interface/tag';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getTags(url: string): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(API_URL + url);
  }

  deleteTag(tagId: number, itemId: number) {
    return this.httpClient.delete(API_URL + '/tags' + '/' + tagId + '/items' + '/' + itemId);
  }
}
