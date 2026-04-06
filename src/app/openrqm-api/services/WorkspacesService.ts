/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RQMWorkspace } from '../models/RQMWorkspace';
import type { RQMWorkspaceUser } from '../models/RQMWorkspaceUser';
import { BaseHttpRequest } from '../core/BaseHttpRequest';
@Injectable({
    providedIn: 'root',
})
export class WorkspacesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all workspaces
     * @returns RQMWorkspace All workspaces were fetched sucessfully
     * @throws ApiError
     */
    public getWorkspaces(): Observable<Array<RQMWorkspace>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/workspaces',
        });
    }
    /**
     * Get a workspace
     * @param workspaceId The workspace identifier
     * @returns RQMWorkspace The workspace was fetched successfully
     * @throws ApiError
     */
    public getWorkspace(
        workspaceId: number,
    ): Observable<RQMWorkspace> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/workspace',
            query: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * Add a workspace
     * @param requestBody The workspace to create
     * @returns any The workspace was created by the backend
     * @throws ApiError
     */
    public postWorkspace(
        requestBody: RQMWorkspace,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/workspace',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a workspace
     * @param requestBody The workspace to update
     * @returns any Updating workspace successful
     * @throws ApiError
     */
    public patchWorkspace(
        requestBody: RQMWorkspace,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/workspace',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a workspace
     * @param workspaceId The workspace to delete
     * @returns any The workspace was deleted successfully
     * @throws ApiError
     */
    public deleteWorkspace(
        workspaceId: number,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/workspace',
            query: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * Get users of a workspace
     * @param workspaceId The workspace identifier
     * @returns RQMWorkspaceUser Users of the workspace
     * @throws ApiError
     */
    public getUsersOfWorkspace(
        workspaceId: number,
    ): Observable<Array<RQMWorkspaceUser>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/workspace/users',
            query: {
                'workspaceId': workspaceId,
            },
        });
    }
    /**
     * Add a user to a workspace
     * @param workspaceId The workspace identifier
     * @param requestBody The workspace user to add
     * @returns any The user was added to the workspace
     * @throws ApiError
     */
    public addUserToWorkspace(
        workspaceId: number,
        requestBody: RQMWorkspaceUser,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/workspace/user',
            query: {
                'workspaceId': workspaceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a user from a workspace
     * @param workspaceId The workspace identifier
     * @param userId The user identifier
     * @returns any The user was deleted from the workspace
     * @throws ApiError
     */
    public deleteUserOfWorkspace(
        workspaceId: number,
        userId: number,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/workspace/user',
            query: {
                'workspaceId': workspaceId,
                'userId': userId,
            },
        });
    }
}
