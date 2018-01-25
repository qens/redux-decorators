import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form'
import formActionSaga from 'redux-form-saga';
// import saga from './services/saga';
// import reducer, {reducerName} from './services/reducer';

const createAppStore = (reducer, emmiterMiddleware) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, undefined, applyMiddleware(logger, sagaMiddleware));

    // sagaMiddleware.run(saga);
    sagaMiddleware.run(formActionSaga);

    return store;
};


export const rootReducer = combineReducers({
    // [reducerName]: reducer,
    form: formReducer
});

export default () => {
    const store = createAppStore(rootReducer, null);

    return store;
}