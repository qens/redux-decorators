import { take, takeEvery, race, put, call, all } from 'redux-saga/effects';

const statuses = ['REQUEST', 'SUCCESS', 'FAILURE'];
const defaultReducer = state => state;
const REDUX_FORM_ACTION_TYPE = '@@saga-redux-form-action/PROMISE';

function SagaReduxFormAction(actionType, ...reducers) {
    return function decorator(target, name, descriptor) {
        target.reducers = target.reducers || new Map();
        const actions = {};
        const requestAction = statuses.map((s, i) => {
            actions[s] = `${actionType}_${s}`;
            actions[s.toLocaleLowerCase()] = function (payload) {
                return {
                    type: actions[s],
                    payload
                };
            };
            target.reducers.set(actions[s], reducers[i] || defaultReducer);
            return actions[s.toLocaleLowerCase()];
        })[0];

        const types = [actions.SUCCESS, actions.FAILURE];

        const formAction = (payload) => ({
            type: REDUX_FORM_ACTION_TYPE,
            payload
        });
        descriptor.value = Object.assign((data, dispatch) => {
            return new Promise((resolve, reject) => {
                dispatch(formAction({
                    request: requestAction(data),
                    defer: {resolve, reject},
                    types
                }));
            });
        }, actions);

    }
}

function *handleReduxFormAction({ payload }) {
    const { request, defer, types } = payload;
    const { resolve, reject } = defer;
    const [ SUCCESS, FAIL ] = types;

    const [ winner ] = yield all([
        race({
            success: take(SUCCESS),
            fail: take(FAIL),
        }),
        put(request),
    ]);

    if (winner.success) {
        yield call(resolve, winner.success && winner.success.payload ? winner.success.payload : winner.success);
    } else {
        yield call(reject, winner.fail && winner.fail.payload ? winner.fail.payload : winner.fail);
    }
}

function *reduxFormActionSaga() {
    yield takeEvery(REDUX_FORM_ACTION_TYPE, handleReduxFormAction);
}

export {
    SagaReduxFormAction,
    REDUX_FORM_ACTION_TYPE,
    reduxFormActionSaga
}