/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMAccessGroup } from '../models/RQMAccessGroup';
import type { RQMUser } from '../models/RQMUser';
import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable({
    providedIn: 'root',
})
export class AccessGroupsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    public getAccessgroups(): Observable<Array<RQMAccessGroup>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accessgroups',
        });
    }

    public getAccessgroup(accessGroupId: number): Observable<RQMAccessGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accessgroup',
            query: {
                'accessGroupId': accessGroupId,
            },
        });
    }

    public addAccessgroup(requestBody: RQMAccessGroup): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accessgroup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    public patchAccessgroup(requestBody: RQMAccessGroup): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accessgroup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    public deleteAccessgroup(accessGroupId: number): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accessgroup',
            query: {
                'accessGroupId': accessGroupId,
            },
        });
    }

    public getUsersOfAccessGroup(accessGroupId: number): Observable<Array<RQMUser>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accessgroup/users',
            query: {
                'accessGroupId': accessGroupId,
            },
        });
    }

    public addUserToAccessGroup(accessGroupId: number, userId: number): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accessgroup/user',
            query: {
                'accessGroupId': accessGroupId,
                'userId': userId,
            },
        });
    }

    public deleteUserOfAccessGroup(accessGroupId: number, userId: number): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accessgroup/user',
            query: {
                'accessGroupId': accessGroupId,
                'userId': userId,
            },
        });
    }
}
