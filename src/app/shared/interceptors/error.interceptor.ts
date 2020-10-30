import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})

export class ErorrInerceptore implements HttpInterceptor {
  constructor(private auth: AuthService,
              private route: Router,
              private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.alertService.warning(error.error.message);
          }
          if (error.status === 500) {
            this.alertService.danger(error.error.message);
          }
          return throwError(error);
        })
      );
  }
}


