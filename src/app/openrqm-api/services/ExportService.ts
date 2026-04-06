/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMTemplate } from '../models/RQMTemplate';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class ExportService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Export a document as OpenRQM Data for import
     * @param documentId The document to export
     * @returns binary Document successfully exported
     * @throws ApiError
     */
    public exportRaw(
        documentId: number,
    ): Observable<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/export/openrqm',
            query: {
                'documentId': documentId,
            },
        });
    }
    /**
     * Export a document as PDF
     * @param documentId The document to export
     * @param templateId The template to use for the export
     * @returns binary Document successfully exported
     * @throws ApiError
     */
    public exportPdf(
        documentId: number,
        templateId: number,
    ): Observable<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/export/pdf',
            query: {
                'documentId': documentId,
                'templateId': templateId,
            },
        });
    }
    /**
     * Get all PDF templates
     * @returns RQMTemplate PDF templates successfully fetched
     * @throws ApiError
     */
    public getPdfTemplates(): Observable<Array<RQMTemplate>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/export/pdf/templates',
        });
    }
    /**
     * Export a document as Markdown
     * @param documentId The document to export
     * @param templateId The template to use for the export
     * @returns binary Document successfully exported
     * @throws ApiError
     */
    public exportMarkdown(
        documentId: number,
        templateId: number,
    ): Observable<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/export/markdown',
            query: {
                'documentId': documentId,
                'templateId': templateId,
            },
        });
    }
    /**
     * Get all Markdown templates
     * @returns RQMTemplate Markdown templates successfully fetched
     * @throws ApiError
     */
    public getMarkdownTemplates(): Observable<Array<RQMTemplate>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/export/markdown/templates',
        });
    }
}
