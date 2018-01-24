# redux-decorators
A library for making development with redux more comfortable and efficient via decorators.
Inspired by https://github.com/mhssmnn/redux-form-saga

```javascript
npm install --save redux-via-decorators
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

You need to include plugin for decorators for babel (i.e. transform-decorators-legacy)

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

Let's take a look how to use the package by simple example – login form.
Let's start with creating a form action:

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
        getAsyncData() {
        }
    }
```
