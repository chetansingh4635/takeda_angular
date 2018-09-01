import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/appConfig';
import { HttpService } from '../../../commons/services/http.service';
import { LocalStorage } from '../../../commons/services/localStorage.service';
@Injectable()
export class AddSubjectService {

  constructor(private _http: HttpService, private router: Router) { }
  getSITESList() {
    return this._http.get(`${AppConfig.baseUrl}/sites`).map(response => response.json());
  }
}
