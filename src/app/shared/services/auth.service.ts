import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(User) {
    return this.http.post(`${environment.baseUrl}/auth/login`, User)
      .pipe(tap(this.setToken));
  }

  private setToken(response) {
    response ? localStorage.setItem('token', response.token) : localStorage.clear();
  }

  get token() {
  return localStorage.getItem('token');
  }

  logout() {
    this.setToken(null);
  }

  isAuth() {
    return !!this.token;
  }
}
