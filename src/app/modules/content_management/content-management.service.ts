import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { AppConfig } from '../../../config/appConfig';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';
@Injectable()
export class ContentManagementService {
 public trialId: any;

  constructor(private _http: HttpService, private http: Http) {  
    this.trialId = localStorage.getItem('trialId');
    console.log("service trial", this.trialId);
  }

  getDocumentList() {
    this.trialId = localStorage.getItem('trialId');
    console.log(this.trialId);
    return this._http.get(`${AppConfig.baseUrl}/cmsDocumentList?trialId=${this.trialId}`).map(response => response.json());
  }

  getViewDocument(documentID) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/${documentID}/viewDocument?read=true`, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        return new Blob([res.blob()], { type: 'application/pdf' });
      });
  }

  documentUpload(userInputObj) {
    const headers = new Headers();
    headers.append('mimeType', 'multipart/form-data');
    headers.append('x-access-token', localStorage.getItem('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${AppConfig.baseUrl}/addDocument`, userInputObj, options).map(response => response.json());
  }

  //  ==========site conten management services============

  approveDocument(id, AorR) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/${id}/approveDocument?status=${AorR}`).map(response => response.json());
  }
  // verifySiteDocument() {
  //   return this._http.get(`${AppConfig.baseUrl}/:documentID/verifyDocument`).map(response => response.json());
  // }


  //  ==========site conten management services end============

  //  ==========Video Component Services============

  getVideoList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/videos?trialId=${this.trialId}`).map(response => response.json());
  }
  addVideo(userObj) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    return this._http.post(`${AppConfig.baseUrl}/videos?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  //  ==========Video Component Services End============

  getlanguagesList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/languagesList?trialId=${this.trialId}`).map(response => response.json());
  }
  getSITESList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/sites?trialId=${this.trialId}`).map(response => response.json());
  }
}
