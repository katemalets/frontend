import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService{

  stopThisRequest = false;

  constructor(private httpClient: HttpClient) {
  }

  uploadImage(file): Observable<any> {
    const data = file;
    this.stopThisRequest = true;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/katemalets/image/upload',
      data
    );
  }

  public getStopThisRequest(): boolean {
    return this.stopThisRequest;
  }

  public setStopThisRequest(stopThisRequest): void {
    this.stopThisRequest = stopThisRequest;
  }
}
