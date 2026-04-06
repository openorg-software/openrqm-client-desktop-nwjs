/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMLink } from '../models/RQMLink';
import type { RQMLinkType } from '../models/RQMLinkType';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class LinksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Link two elements
     * @param requestBody
     * @returns RQMLink Linking was successful
     * @throws ApiError
     */
    public linkElement(
        requestBody?: RQMLink,
    ): Observable<RQMLink> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/link',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a link
     * @param linkId The id of the link
     * @returns any Deleting link was successful
     * @throws ApiError
     */
    public deleteLink(
        linkId: number,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/link',
            query: {
                'linkId': linkId,
            },
        });
    }
    /**
     * Get the link types
     * @returns RQMLinkType LinkTypes successfully fetched
     * @throws ApiError
     */
    public getLinkTypes(): Observable<Array<RQMLinkType>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/linkTypes',
        });
    }
}
