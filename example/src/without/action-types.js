import {moduleId} from "./module-id";

export const actionTypes = {
    TRIGGER: `${moduleId}/TRIGGER`,

    GET_DATA_REQUEST: `${moduleId}/GET_DATA_REQUEST`,
    GET_DATA_SUCCESS: `${moduleId}/GET_DATA_SUCCESS`,
    GET_DATA_FAILURE: `${moduleId}/GET_DATA_FAILURE`,
};