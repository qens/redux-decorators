import {Reducer, Action} from "redux-via-decorators/lib/index";
import {fromJS} from "immutable";

export const reducerName = 'with';

const initialState = fromJS({
    trigger: false
});

@Reducer
class WithReducer {

    @Action(`${reducerName}/TRIGGER`, (state = initialState, action) => state.set('trigger', action.payload))
    trigger() {
    }
}

export const withReducer = new WithReducer();