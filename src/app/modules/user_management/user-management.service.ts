import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { AppConfig } from '../../../config/appConfig';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';
import { Constants } from '../../../config/constant';
import { LocalStorage } from '../../commons/services/localStorage.service';
import * as _ from 'lodash';
@Injectable()
export class UserManagementService {
  public trialId: any;
  public _id: any;
  public constants = Constants;

  constructor(private _http: HttpService, private http: Http) {
    this.trialId = LocalStorage.get('trialId');
    this._id = LocalStorage.get('tId');
    console.log("service trial", this.trialId);
  }

  getSubjectList(type) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/subjects?trialId=${this.trialId}&subType=${type}`).map(response => response.json());
  }
  addSubject(userObj) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    return this._http.post(`${AppConfig.baseUrl}/subjects?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  updateSubject(userObj, id) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    return this._http.put(`${AppConfig.baseUrl}/${id}/subjects?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  updateSubjectAssign(userObj, id) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    return this._http.put(`${AppConfig.baseUrl}/${id}/subjects/assignSite?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  qualifySubject(userObj, id) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.put(`${AppConfig.baseUrl}/${id}/subjects/qualifySubject?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  wetUpload(userInputObj, subjectId) {
    const headers = new Headers();
    headers.append('mimeType', 'multipart/form-data');
    headers.append('x-access-token', localStorage.getItem('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${AppConfig.baseUrl}/${subjectId}/uploadSign?signType=wet&trialId=${this.trialId}`, userInputObj, options)
      .map(response => response.json());
  }

  getAllVisits() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/visits?trialId=${this._id}`).map(response => response.json());
  }

  getAllMedications() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/medications?trialId=${this._id}`).map(response => response.json());
  }
  getSubjectDetail(id) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/${id}/subjects?trialId=${this.trialId}`).map(response => response.json());
  }

  addAndUpdateVisit(userInputObj, id) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.put(`${AppConfig.baseUrl}/${id}/subjects/visits?trialId=${this.trialId}`, userInputObj).map(response => response.json());
  }
  addAndUpdateMedication(userInputObj, id) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.put(`${AppConfig.baseUrl}/${id}/subjects/medications?trialId=${this.trialId}`, userInputObj).map(response => response.json());
  }

  viewSignature(subjectId, type) {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/${subjectId}/viewSign?trialId=${this.trialId}&signType=${type}`,
      { responseType: ResponseContentType.Blob }).map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' });
        });
  }
  getSITESList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/sites?trialId=${this.trialId}`).map(response => response.json());
  }
  deleteSubject(userObj, id) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    return this._http.delete(`${AppConfig.baseUrl}/${id}/subjects?trialId=${this.trialId}`, userObj).map(response => response.json());
  }
  // Superadmin User Management
  getUserList(type) {
    this.trialId = localStorage.getItem('trialId');
    if (type === this.constants.adminId) {
      return this._http.get(`${AppConfig.baseUrl}/users?type=${type}&trialId=${this.trialId}`).map(response => response.json());
    } else {
      return this._http.get(`${AppConfig.baseUrl}/organisations?trialId=${this.trialId}`).map(response => response.json());
    }
  }

  getLocationList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/locations?trialId=${this.trialId}`).map(response => response.json());
  }
  addUser(userObj, type) {
    this.trialId = localStorage.getItem('trialId');
    if (type === 'admin') {
      return this._http.post(`${AppConfig.baseUrl}/users?trialId=${this.trialId}`, userObj).map(response => response.json());
    } else {
      return this._http.post(`${AppConfig.baseUrl}/organisations?trialId=${this.trialId}`, userObj).map(response => response.json());
    }

  }

  editUser(userObj, id, type) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    if (type === this.constants.adminId) {
      return this._http.put(`${AppConfig.baseUrl}/${id}/users?trialId=${this.trialId}`, userObj).map(response => response.json());
    } else {
      return this._http.put(`${AppConfig.baseUrl}/${id}/organisations?trialId=${this.trialId}`, userObj).map(response => response.json());
    }

  }
  deleteUserDetails(id, type) {
    this.trialId = localStorage.getItem('trialId');
    // console.log(userObj)
    if (type === this.constants.adminId) {
      return this._http.delete(`${AppConfig.baseUrl}/${id}/users?trialId=${this.trialId}`).map(response => response.json());
    } else {
      return this._http.delete(`${AppConfig.baseUrl}/${id}/organisations?trialId=${this.trialId}`).map(response => response.json());
    }

  }
  getRoleList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/getRoleList?trialId=${this.trialId}`).map(response => response.json());
  }
  getCroList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/cros?trialId=${this.trialId}`).map(response => response.json());
  }
  getPiList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/pis?trialId=${this.trialId}`).map(response => response.json());
  }
  getSponsorList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/organisations?type=${this.constants.sponsorId}&trialId=${this.trialId}`).map(response => response.json());
  }
  getIrbList() {
    this.trialId = localStorage.getItem('trialId');
    return this._http.get(`${AppConfig.baseUrl}/irbs?trialId=${this.trialId}`).map(response => response.json());
  }

  checkDuplicateUser(user) {
    let data = _.uniqBy(user, 'emailId');
    if (data.length === user.length) {
      return true;
    }
    return false;
  }
}
