import { Injectable } from '@angular/core';
import { HttpService } from '../../../commons/services/http.service';
import { AppConfig } from '../../../../config/appConfig';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';


@Injectable()
export class DashboardService {


  constructor(private http: HttpService, private _http:Http) { }

  getTrialList() {
    return this.http.get(`${AppConfig.baseUrl}/trialListDashboard`)
      .map(response => response.json());
  }

  createTrial(userInputObj){
    const headers = new Headers();
    headers.append('mimeType', 'multipart/form-data');
    headers.append('x-access-token', localStorage.getItem('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(`${AppConfig.baseUrl}/createTrial`, userInputObj, options).map(response => response.json());
  }


}
