import {Reducer, Action} from "redux-via-decorators/lib/index";
import {fromJS} from "immutable";

export const reducerName = 'with';

const initialState = fromJS({
    trigger: false
});

@Reducer(initialState)
class WithReducer {

    @Action(`${reducerName}/TRIGGER`, (state, action) => state.set('trigger', action.payload))
    trigger() {
    }
}

export const withReducer = new WithReducer();