import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../../config/appConfig';
import { HttpService } from '../../../../commons/services/http.service';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import { Constants } from '../../../../../config/constant';
@Injectable()
export class AdminService {
    private isUserLoggedIn;
    private userName;
    public constants = Constants;
    public trialId: any;
    public _id: any;
    constructor(private _http: HttpService, private router: Router) {
        this.isUserLoggedIn = false;
        this.trialId = LocalStorage.get('trialId');
        this._id = LocalStorage.get('tId');
        console.log("service trial", this.trialId);
    }
    getList(type) {
        console.log(type);
        this.trialId = localStorage.getItem('trialId');
        if (type == this.constants.sitesId) {
            return this._http.get(`${AppConfig.baseUrl}/organisations?type=${type}&groupBy=${this.constants.sitesId},${this.constants.piId}`).map(response => response.json());
        } else {
            return this._http.get(`${AppConfig.baseUrl}/organisations?type=${type}`).map(response => response.json());
        }
    }
    createUser(userInputObj) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.post(`${AppConfig.baseUrl}/createUser`, userInputObj).map(response => response.json());
    }
    editUser(id, userInputObj) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.put(`${AppConfig.baseUrl}/editUser/:id`, userInputObj).map(response => response.json());
    }

    saveUsers(objData) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.post(`${AppConfig.baseUrl}/users?trialId=${this.trialId}`, objData).map(response => response.json());
    }

    saveOrganisations(objData) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.post(`${AppConfig.baseUrl}/organisations?trialId=${this.trialId}`, objData).map(response => response.json());
    }

    deleteOrganisation(id) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.delete(`${AppConfig.baseUrl}/${id}/organisations?trialId=${this.trialId}`).map(response => response.json());
    }
    deleteUser(userId) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.delete(`${AppConfig.baseUrl}/${userId}/users?trialId=${this.trialId}`).map(response => response.json());
    }
    getCroList() {
        this.trialId = localStorage.getItem('trialId');
        return this._http.get(`${AppConfig.baseUrl}/cros?trialId=${this.trialId}`).map(response => response.json());
    }
    saveIrb(data) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.post(`${AppConfig.baseUrl}/irbs?trialId=${this.trialId}`, data).map(response => response.json());
    }
    getIrbList() {
        this.trialId = localStorage.getItem('trialId');
        return this._http.get(`${AppConfig.baseUrl}/irbs?trialId=${this.trialId}`).map(response => response.json());
    }
    deleteIrb(id) {
        this.trialId = localStorage.getItem('trialId');
        return this._http.delete(`${AppConfig.baseUrl}/${id}/irbs?trialId=${this.trialId}`).map(response => response.json());
    }
}
