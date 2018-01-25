import {actionTypes} from "./action-types";

export function triggerAction(payload) {
    return {
        type: actionTypes.TRIGGER,
        payload
    };
}