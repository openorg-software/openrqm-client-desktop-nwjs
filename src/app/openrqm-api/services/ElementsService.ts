/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMElement } from '../models/RQMElement';
import type { RQMElementType } from '../models/RQMElementType';
import type { RQMLink } from '../models/RQMLink';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class ElementsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all elements
     * @param documentId The document id for which the elements are fetched
     * @returns RQMElement Elements successfully fetched
     * @throws ApiError
     */
    public getElements(
        documentId: number,
    ): Observable<Array<RQMElement>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/elements',
            query: {
                'documentId': documentId,
            },
        });
    }
    /**
     * Add an element
     * @param aboveRank The rank of the element above, if no above element exists this shall be set to aaaaaaaaaaaaaaaaaaaa
     * @param belowRank The rank of the element below, if no below element exists this shall be set to an empty string
     * @param requestBody The element to create, if the element should be created at the highest level, the parentElementId shall be null
     * @returns any The element created by the backend
     * @throws ApiError
     */
    public postElement(
        aboveRank: string,
        belowRank: string,
        requestBody: RQMElement,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/element',
            query: {
                'aboveRank': aboveRank,
                'belowRank': belowRank,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update an element
     * @param requestBody The element to update
     * @returns any Updating element successful
     * @throws ApiError
     */
    public patchElement(
        requestBody: RQMElement,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/element',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete an element
     * @param elementId The element to delete
     * @returns any Deleting element successful
     * @throws ApiError
     */
    public deleteElement(
        elementId: number,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/element',
            query: {
                'elementId': elementId,
            },
        });
    }
    /**
     * Get all links of a given element
     * @param elementId The id of the element
     * @returns RQMLink Incoming links successfully fetched
     * @throws ApiError
     */
    public getIncomingLinksOfElement(
        elementId: number,
    ): Observable<Array<RQMLink>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/element/inlinks',
            query: {
                'elementId': elementId,
            },
        });
    }
    /**
     * Get all links of a given element
     * @param elementId The id of the element
     * @returns RQMLink Outgoing links successfully fetched
     * @throws ApiError
     */
    public getOutgoingLinksOfElement(
        elementId: number,
    ): Observable<Array<RQMLink>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/element/outlinks',
            query: {
                'elementId': elementId,
            },
        });
    }
    /**
     * Get all element types
     * @returns RQMElementType ElementTypes successfully fetched
     * @throws ApiError
     */
    public getElementTypes(): Observable<Array<RQMElementType>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/elementTypes',
        });
    }
}
