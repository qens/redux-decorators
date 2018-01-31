# redux-via-decorators
A library for making development with redux more comfortable and efficient via decorators.
Inspired by https://github.com/mhssmnn/redux-form-saga

```javascript
npm install --save-dev redux-via-decorators
```

## Why do I need this?

If you want to avoid the routine during development writing ActionTypes, Actions, Reducers in clear way. And you are not crazy about having similar code everywhere. This library will help you.

## Installation

### Using npm
```javascript
npm install --save-dev redux-via-decorators
```

### Using yarn
```javascript
yarn add -D redux-via-decorators
```

## Preparation

You need to include plugin for decorators for babel (i.e. transform-decorators-legacy) or switch on experimentalDecorators if you're using typescript (not tested yet)

if you need a SagaReduxFormAction, you need to run provided `reduxFormActionSaga`  in your `sagaMiddleware.run()`:

```javascript
import reduxFormActionSaga from 'redux-via-decorators';

const sagas = [
  yourFirstSaga,
  yourSecondSaga,
  // ...
  reduxFormActionSaga,
];
sagas.forEach((saga) => sagaMiddleware.run(saga));
```

## Usage

Let's take a look how to use the package by simple example.
Just create a service as a class

```javascript
//
    @Reducer
    class TestService {

        @Action('GET_DATA', (state, action) => state.set('data', fromJS(action.payload)))
        getData() {
        }

        @AsyncAction('GET_ASYNC_DATA',
            (state, action) => state.set('loading', true),
            (state, action) => state.set('loading', false).set('error', null).set('data', fromJS(action.payload)),
            (state, action) => state.set('loading', false).set('error', action.payload))
        getAsyncData() {
        }

        @SagaReduxFormAction('REDUX_FORM_ACTION',
            (state, action) => state.set('loading', true),
            (state, action) => state.set('loading', false).set('error', null).set('data', fromJS(action.payload)),
            (state, action) => state.set('loading', false).set('error', action.payload))
        reduxFormAction() {
        }
    }

    export const testService = new TestService();

    // component.js
    export default connect(mapStateToProps, dispatch => {
        return {
            getData: bindActionCreators(testService.getAsyncData, dispatch),
            // or testService.getAsyncData.request
            ...
        };
    })(Component);

    // saga.js
    function* getData() {
        try {
            const data = yield call(api.getData);
            yield put(testService.getAsyncData.success(data));
        } catch (err) {
            yield put(testService.getAsyncData.failure(err));
        }
    }

    export default function* () {
        yield takeEvery(testService.getAsyncData.REQUEST, getData);
    }
```

@Reducer will provide a method reducer which you need to combine with others

```javascript
    import {testService} from 'test-service';

    const rootReducer = combineReducers({
        youFirstReducer: firstReducer,
        ....
        [reducerName]: testService.reducer

    });

```

### @Action
```javascript
    @Action('GET_DATA', (state, action) => state.set('data', fromJS(action.payload)))
    getData() {
    }

    .getData(payload) === {type: 'GET_DATA', payload}
    .getData.ACTION === 'GET_DATA'
```


### @AsyncAction
```javascript
    @AsyncAction(
        // ActionType
        'GET_ASYNC_DATA',
        // request handler
        (state, action) => state.set('loading', true),
        // success handler
        (state, action) => state.set('loading', false).set('error', null).set('data', fromJS(action.payload)),
        // error handler
        (state, action) => state.set('loading', false).set('error', action.payload))
    getAsyncData() {
    }

    .getAsyncData.REQUEST === 'GET_ASYNC_DATA_REQUEST';
    .getAsyncData.SUCCESS === 'GET_ASYNC_DATA_SUCCESS';
    .getAsyncData.FAILURE === 'GET_ASYNC_DATA_FAILURE';


    .getAsyncData(payload) === { type: 'GET_ASYNC_DATA_REQUEST', payload } // the same as a .request()
    .getAsyncData.request(payload) === { type: 'GET_ASYNC_DATA_REQUEST', payload };
    .getAsyncData.success(payload) === { type: 'GET_ASYNC_DATA_SUCCESS', payload };
    .getAsyncData.failure(payload) === { type: 'GET_ASYNC_DATA_FAILURE', payload };
```

### @SagaReduxFormAction
The idea of this decorator comes from https://github.com/mhssmnn/redux-form-saga, more information could be found there.
```javascript
    @SagaReduxFormAction(
        // ActionType
        'REDUX_FORM_ACTION',
        // request handler
        (state, action) => state.set('loading', true),
        // success handler
        (state, action) => state.set('loading', false).set('error', null).set('data', fromJS(action.payload)),
        // error handler
        (state, action) => state.set('loading', false).set('error', action.payload))
    reduxFormAction() {
    }

    .reduxFormAction.REQUEST === 'REDUX_FORM_ACTION_REQUEST';
    .reduxFormAction.SUCCESS === 'REDUX_FORM_ACTION_SUCCESS';
    .reduxFormAction.FAILURE === 'REDUX_FORM_ACTION_FAILURE';

    .reduxFormAction(payload) === PROMISE // It is handled inside library, no need to be cared about

    .reduxFormAction.request(payload) === { type: 'REDUX_FORM_ACTION_REQUEST', payload };
    .reduxFormAction.success(payload) === { type: 'REDUX_FORM_ACTION_SUCCESS', payload };
    .reduxFormAction.failure(payload) === { type: 'REDUX_FORM_ACTION_FAILURE', payload };
```

### @Reducer
```javascript
    This decorator for class, create a property "_reducers" to store sub reducers,
    and added method "reducer", which should be combined with others and included in app

    @Reducer
    class Clazz {}

    Clazz._reducers // inner property to store all sub reducers
    Clazz.reducer => (state, action) => { return newState } // default redux reducer
```