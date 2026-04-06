/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMElementTypeColor } from '../models/RQMElementTypeColor';
import type { RQMTheme } from '../models/RQMTheme';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class ThemesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all themes of a document
     * @param documentId The document id to identify the correct themes
     * @returns RQMTheme Fetching themes successful
     * @throws ApiError
     */
    public getThemesOfDocument(
        documentId: number,
    ): Observable<Array<RQMTheme>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/document/themes',
            query: {
                'documentId': documentId,
            },
        });
    }
    /**
     * Get a theme
     * @param themeId The theme id
     * @returns RQMTheme Fetching theme successful
     * @throws ApiError
     */
    public getTheme(
        themeId: number,
    ): Observable<RQMTheme> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/theme',
            query: {
                'themeId': themeId,
            },
        });
    }
    /**
     * Create a new theme
     * @param requestBody
     * @returns any Creating theme successful
     * @throws ApiError
     */
    public createTheme(
        requestBody: RQMTheme,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/theme',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a theme
     * @param requestBody
     * @returns any Updating theme successful
     * @throws ApiError
     */
    public updateTheme(
        requestBody: RQMTheme,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/theme',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all element type colors of a theme
     * @param themeId
     * @returns RQMElementTypeColor Get ElementTypeColors successful
     * @throws ApiError
     */
    public getElementTypeColorsOfTheme(
        themeId: number,
    ): Observable<Array<RQMElementTypeColor>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/theme/elementTypeColors',
            query: {
                'themeId': themeId,
            },
        });
    }
}
