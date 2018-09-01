import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../../config/appConfig';
import { HttpService } from '../../../../commons/services/http.service';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
@Injectable()
export class SuperAdminService {
    private isUserLoggedIn;
    private userName;

    constructor(private _http: HttpService, private router: Router) {
        this.isUserLoggedIn = false;
    }
    getUserList() {
        return this._http.get(`${AppConfig.baseUrl}/organisations`).map(response => response.json());
    }
    createUser(userInputObj) {
        return this._http.post(`${AppConfig.baseUrl}/createUser`, userInputObj).map(response => response.json());
    }
    editUser(id, userInputObj ) {
        return this._http.put(`${AppConfig.baseUrl}/editUser/:id`, userInputObj).map(response => response.json());
    }

    deleteUser(id) {
        return this._http.delete(`${AppConfig.baseUrl}/deleteUser/:id`).map(response => response.json());
    }

}
