import {moduleId} from "./module-id";
import {fromJS} from "immutable";
import {actionTypes} from "./action-types";

export const reducerName = moduleId;

const initialState = fromJS({
    trigger: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TRIGGER:
            return state.set('trigger', action.payload);

        default:
            return state;
    }
}