/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularHttpRequest } from './core/AngularHttpRequest';
import { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { OpenAPI } from './core/OpenAPI';
import { AccessGroupsService } from './services/AccessGroupsService';
import { DocumentsService } from './services/DocumentsService';
import { ElementsService } from './services/ElementsService';
import { ExportService } from './services/ExportService';
import { ImportService } from './services/ImportService';
import { LinksService } from './services/LinksService';
import { ThemesService } from './services/ThemesService';
import { UserManagementService } from './services/UserManagementService';
import { WorkspacesService } from './services/WorkspacesService';
@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: OpenAPI,
            useValue: {
                BASE: OpenAPI?.BASE ?? 'http://127.0.0.1:8090',
                VERSION: OpenAPI?.VERSION ?? '1.0.1',
                WITH_CREDENTIALS: OpenAPI?.WITH_CREDENTIALS ?? false,
                CREDENTIALS: OpenAPI?.CREDENTIALS ?? 'include',
                TOKEN: OpenAPI?.TOKEN,
                USERNAME: OpenAPI?.USERNAME,
                PASSWORD: OpenAPI?.PASSWORD,
                HEADERS: OpenAPI?.HEADERS,
                ENCODE_PATH: OpenAPI?.ENCODE_PATH,
            } as OpenAPIConfig,
        },
        {
            provide: BaseHttpRequest,
            useClass: AngularHttpRequest,
        },
        AccessGroupsService,
        DocumentsService,
        ElementsService,
        ExportService,
        ImportService,
        LinksService,
        ThemesService,
        UserManagementService,
        WorkspacesService,
    ]
})
export class OpenRqmApi {}

