import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { AppConfig } from '../../../config/appConfig';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';

@Injectable()
export class MachineLearningService {

  constructor(private http: Http) { }

  uploadDocument(userInputObj) {
    console.log(userInputObj);
    return this.http.post(`${AppConfig.mlBaseUrl}/upload/`, userInputObj)
      .map(response => response.json());
  }

  uploadget() {
    return this.http.get(`${AppConfig.mlBaseUrl}/uploadget/`)
      .map(response => response.json());
  }

  downloadFile(path) {
    // return this.http.get(`${AppConfig.mlBaseUrlD}`+path)
    //   .map(response => response);
  }

}
