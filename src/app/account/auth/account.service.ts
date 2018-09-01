import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/appConfig';
import { User } from './user';
import { HttpService } from '../../commons/services/http.service';
import { LocalStorage } from '../../commons/services/localStorage.service';
import { Http, Headers, ConnectionBackend, Response, RequestOptionsArgs, Request, RequestOptions } from '@angular/http';
@Injectable()
export class AccountService {
  private isUserLoggedIn;
  private userName;
  private options: RequestOptions;

  constructor(private _http: HttpService, private router: Router, public http: Http) {
    this.isUserLoggedIn = false;
  }

  getRoleList() {
    return this._http.get(`${AppConfig.baseUrl}/getRoleList`).map(response => response.json());
  }

  setUserLoggedIn(): void {
    if (LocalStorage.hasOwnProperty('access_token')) {
      LocalStorage.set('isUserLoggedIn', 'true');
      this.isUserLoggedIn = true;
    }
  }
  getUserLoggedIn(): Boolean {
    if (LocalStorage.hasOwnProperty('access_token')) {
      return this.isUserLoggedIn = Boolean(LocalStorage.get('isUserLoggedIn'));
    }
  }
  checkRole(): any {
    if (LocalStorage.hasOwnProperty('role')) {
      return LocalStorage.get('role');
    }
  }
  login(userInputObj) {
    return this._http.post(`${AppConfig.baseUrl}/login`, userInputObj).map(response => response.json());
  }
  signup(userInputObj) {
    return this._http.post(`${AppConfig.baseUrl}/signup`, userInputObj);
  }
  forgotPassword(userInputObj) {
    return this._http.post(`${AppConfig.baseUrl}/users/forgotPassword`, userInputObj).map(response => response.json());
  }
  setPassword(userInputObj) {
    return this._http.put(`${AppConfig.baseUrl}/users/setPassword`, userInputObj).map(response => response.json());
  }

  logout() {
    this.isUserLoggedIn = false;
    if (!this.isUserLoggedIn) {
      LocalStorage.remove('access_token');
      LocalStorage.remove('currentUser');
      LocalStorage.remove('isUserLoggedIn');
      LocalStorage.remove('role');
      this.router.navigate(['/login']);
    }
  }

}
