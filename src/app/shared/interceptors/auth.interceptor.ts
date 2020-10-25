import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})

export class AuthInterceptore implements HttpInterceptor {
  constructor(private auth: AuthService,
              private route: Router,
              private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.auth.isAuth()) {
      req = req.clone({
        setHeaders: {
          Authorization: ` ${this.auth.token}`
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            this.auth.logout();
            this.route.navigate(['/admin', 'login']);
            this.alertService.danger('Dupa.');
          }
          return throwError(error);
        })
      );
  }
}
