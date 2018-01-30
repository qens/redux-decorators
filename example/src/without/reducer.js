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

        case actionTypes.GET_DATA_REQUEST:
            return state.set('loading', true);
        case actionTypes.GET_DATA_SUCCESS:
            return state.set('data', action.payload).set('loading', false).set('error', null);
        case actionTypes.GET_DATA_FAILURE:
            return state.set('error', action.payload).set('loading', false);

        default:
            return state;
    }
}