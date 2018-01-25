import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form'
import formActionSaga from 'redux-form-saga';
// import saga from './services/saga';
import withoutReducer, {reducerName as withoutReducerName} from './without/reducer';
import {withReducer, reducerName as withReducerName} from "./with/reducer";

const createAppStore = (reducer, emmiterMiddleware) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, undefined, applyMiddleware(logger, sagaMiddleware));

    // sagaMiddleware.run(saga);
    sagaMiddleware.run(formActionSaga);

    return store;
};

console.log(withReducer.reducer, withReducer.reducers);
export const rootReducer = combineReducers({
    [withoutReducerName]: withoutReducer,
    [withReducerName]: withReducer.reducer,
    form: formReducer
});

export default () => {
    const store = createAppStore(rootReducer, null);

    return store;
}