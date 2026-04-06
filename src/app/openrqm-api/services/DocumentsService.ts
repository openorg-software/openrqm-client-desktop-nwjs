/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMDocument } from '../models/RQMDocument';
import type { RQMLink } from '../models/RQMLink';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class DocumentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all documents
     * @returns RQMDocument Documents sucessfully fetched
     * @throws ApiError
     */
    public getDocuments(): Observable<Array<RQMDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/documents',
        });
    }
    /**
     * Get a document
     * @param documentId The document identifier
     * @returns RQMDocument Document successfully fetched
     * @throws ApiError
     */
    public getDocument(
        documentId: number,
    ): Observable<RQMDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/document',
            query: {
                'documentId': documentId,
            },
        });
    }
    /**
     * Add a document
     * @param requestBody The document to create
     * @returns any The document created by the backend
     * @throws ApiError
     */
    public postDocument(
        requestBody: RQMDocument,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/document',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a document
     * @param requestBody The document to update
     * @returns any Updating document successful
     * @throws ApiError
     */
    public patchDocument(
        requestBody: RQMDocument,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/document',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a document
     * @param documentId The document to delete
     * @returns any The document was deleted successfully
     * @throws ApiError
     */
    public deleteDocument(
        documentId: number,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/document',
            query: {
                'documentId': documentId,
            },
        });
    }
    /**
     * Get all links of a document
     * @param documentId The document id to identify the correct links
     * @returns RQMLink Fetching links successful
     * @throws ApiError
     */
    public getLinksOfDocument(
        documentId: number,
    ): Observable<Array<RQMLink>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/document/links',
            query: {
                'documentId': documentId,
            },
        });
    }
}
