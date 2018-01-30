import {actionTypes} from "./action-types";

export function triggerAction(payload) {
    return {
        type: actionTypes.TRIGGER,
        payload
    };
}

export function getDataAction() {
    return {
        type: actionTypes.GET_DATA_REQUEST
    }
}