/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class ImportService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Post document for import
     * @param workspaceId The workspace for the document
     * @param formData
     * @returns any Document successfully imported
     * @throws ApiError
     */
    public importDocument(
        workspaceId: number,
        formData: {
            /**
             * The file to upload.
             */
            upfile: Blob;
        },
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/import',
            query: {
                'workspaceId': workspaceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
