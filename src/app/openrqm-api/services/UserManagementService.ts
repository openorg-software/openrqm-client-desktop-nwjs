/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMUser } from '../models/RQMUser';
import type { RQMToken } from '../models/RQMToken';
import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable({
    providedIn: 'root',
})
export class UserManagementService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    public login(passwordHash: string, email: string): Observable<RQMToken> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/login',
            query: {
                'passwordHash': passwordHash,
                'email': email,
            },
        });
    }

    public logout(id: number): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/logout',
            query: {
                'id': id,
            },
        });
    }

    public register(passwordHash: string, requestBody: RQMUser): Observable<RQMToken> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/register',
            query: {
                'passwordHash': passwordHash,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    public getUsers(): Observable<Array<number>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
        });
    }

    public getInfo(id: number): Observable<RQMUser> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user',
            query: {
                'id': id,
            },
        });
    }

    public changeUser(id: number, passwordHash: string, newPasswordHash: string, requestBody: RQMUser): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/user',
            query: {
                'id': id,
                'passwordHash': passwordHash,
                'newPasswordHash': newPasswordHash,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    public deleteUser(passwordHash: string, id: number): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user',
            query: {
                'passwordHash': passwordHash,
                'id': id,
            },
        });
    }
}
