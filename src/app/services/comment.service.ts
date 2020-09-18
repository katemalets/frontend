import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createComment(comment, itemId: number, userId: number) {
    return this.httpClient.post(API_URL + '/comments' + '/' + itemId + '/' + userId , comment);
  }
}
