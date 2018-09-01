import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { AppConfig } from '../../../config/appConfig';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';
import { Constants } from '../../../config/constant';
import { LocalStorage } from '../../commons/services/localStorage.service';
@Injectable()
export class TrialManagementService {
public id:any;
public constants = Constants;
public trialId: any;

constructor(private _http: HttpService, private http: Http) {  
  this.trialId = LocalStorage.get('trialId');
  this.id = LocalStorage.get('tId');
  console.log("service trial", this.trialId);
}

  getRegionList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/regions?trialId=${this.trialId}`).map(response => response.json());
  }
  getSitesList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/sites?trialId=${this.trialId}`).map(response => response.json());
  }
  getCroList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/cros?trialId=${this.trialId}`).map(response => response.json());
  }
  getIrbList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/irbs?trialId=${this.trialId}`).map(response => response.json());
  }

  getVisitTypeList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/visitType?trialId=${this.trialId}`).map(response => response.json());
  }

  createTrial(userInputObj) {
    const headers = new Headers();
    headers.append('mimeType', 'multipart/form-data');
    headers.append('x-access-token', localStorage.getItem('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${AppConfig.baseUrl}/createTrial`, userInputObj, options).map(response => response.json());
  }
editTrial(userInputObj){
  const headers = new Headers();
  headers.append('mimeType', 'multipart/form-data');
  headers.append('x-access-token', localStorage.getItem('access_token'));
  const options = new RequestOptions({ headers: headers });
  return this.http.put(`${AppConfig.baseUrl}/${this.id}/editTrial`, userInputObj, options).map(response => response.json());
}
  getSponsorList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/organisations?type=${this.constants.sponsorId}`).map(response => response.json());
  }
  getTrialDetail(id) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/trialList?trialId=${id}`).map(response => response.json());
  }
}
