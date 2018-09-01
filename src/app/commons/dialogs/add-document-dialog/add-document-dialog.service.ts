import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/appConfig';
import { HttpService } from '../../../commons/services/http.service';
import { LocalStorage } from '../../../commons/services/localStorage.service';
@Injectable()
export class AddDocumentDialogService {

  constructor(private _http: HttpService, private router: Router) {
  }

  getCROList() {
    return this._http.get(`${AppConfig.baseUrl}/cros`).map(response => response.json());
  }
  getSITESList() {
    return this._http.get(`${AppConfig.baseUrl}/sites`).map(response => response.json());
  }
  getIRBList() {
    return this._http.get(`${AppConfig.baseUrl}/irbs`).map(response => response.json());
  }
  checkVersion(docId, version, siteId, lang) {
    if (siteId) {
      return this._http.get(`${AppConfig.baseUrl}/${docId}/${version}/${lang}/${siteId}/checkDocVersion`).map(response => response.json());
    } else {
      return this._http.get(`${AppConfig.baseUrl}/${docId}/${version}/${lang}/checkDocVersion`).map(response => response.json());
    }
  }
  getDocumentslList() {
    return this._http.get(`${AppConfig.baseUrl}/documentNamesList`).map(response => response.json());
  }
  getlanguagesList() {
    return this._http.get(`${AppConfig.baseUrl}/languagesList`).map(response => response.json());
  }
}
