import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }//authentication token'ını almak için kullanılır

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//http isteklerini alır intercept
    const token = this.authService.getAccessToken();//authservice üzerinden mevcut tokenı alır

    if (token) {//eğer token varsa klonlanır istekler 
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,//authorization bareer ile token gönderilir
        },
      });
    }

    return next.handle(request);
  }
}
