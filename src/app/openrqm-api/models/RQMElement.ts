/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RQMElement = {
    /**
     * When creating an element the id is ignored by the backend because it generates one, when updating the element it has to be set
     */
    id?: number;
    /**
     * When creating an element the documentId has to be set to assign the requirement to the correct document, it can not be updated.
     */
    documentId?: number;
    elementTypeId?: number;
    content?: string;
    rank?: string;
    parentElementId?: number;
};

