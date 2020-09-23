import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {UploadService} from '../services/upload.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private token: TokenStorageService,
              private uploadService: UploadService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    const stopThisRequest = this.uploadService.getStopThisRequest();
    console.log('STOPREQUEST?' + stopThisRequest);
    if (stopThisRequest) {
      this.uploadService.setStopThisRequest(false);
      return next.handle(req);
    }
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
