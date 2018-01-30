import {Reducer, Action} from "redux-via-decorators/lib/index";
import {fromJS} from "immutable";
import {SagaReduxFormAction} from "../../../src/saga";
import {AsyncAction} from "../../../src";

export const reducerName = 'with';

const initialState = fromJS({
    trigger: false
});

@Reducer(initialState)
class WithReducer {

    @Action(`${reducerName}/TRIGGER`, (state, action) => state.set('trigger', action.payload))
    trigger() {
    }

    @AsyncAction(`${reducerName}/GET_DATA`, (state, aciton) => state.set('loading', true),
        (state, action) => state.set('data', action.payload).set('loading', false).set('error', null),
        (state, action) => state.set('error', action.payload).set('loading', false))
    getData() {}

    @SagaReduxFormAction(`${reducerName}/LOGIN`, (state, action) => state.set('loading', true),
        (state, action) => state.set('username', action.payload).set('loading', false).set('error', null),
        (state, action) => state.set('loading', false).set('error', action.payload))
    login() {
    }
}

export const withReducer = new WithReducer();