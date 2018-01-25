import {fromJS} from "immutable";
import {Action, AsyncAction, Reducer} from "../src";

const expect = require('expect');
/***
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * https://github.com/wycats/javascript-decorators
 *
 */
describe('Reducer and Action', () => {
    let service;

    beforeEach(() => {

        @Reducer({})
        class TestService {

            @Action('GET_DATA', (state, action) => state.set('data', fromJS(action.payload)))
            getData() {
            }
        }

        service = new TestService();
    });

    it('should have filled reducers map', () => {
        expect(service.reducers).toBeTruthy();
        expect(service.reducers.size).toEqual(1);
    });

    it('should change result of decorated method', () => {
        expect(service.getData.ACTION).toEqual('GET_DATA');
        const payload = 10;
        expect(service.getData(payload)).toEqual({type: 'GET_DATA', payload: payload});
    });

    it('should reducer be a function', () => {
        expect(service.reducer).toBeTruthy();
        expect(service.reducer).toBeInstanceOf(Function);
    })

});

describe('AsyncAction', () => {
    let service;

    beforeEach(() => {

        @Reducer({})
        class TestService {

            @AsyncAction('GET_ASYNC_DATA',
                (state, action) => state.set('loading', true),
                (state, action) => state.set('loading', false).set('error', null).set('data', fromJS(action.payload)),
                (state, action) => state.set('loading', false).set('error', action.payload))
            getAsyncData() {
            }

        }

        service = new TestService();
    });

    it('should have filled reducers map', () => {
        expect(service.reducers).toBeTruthy();
        expect(service.reducers.size).toEqual(3);
    });

    it('should change result of decorated method', () => {
        expect(service.getAsyncData.REQUEST).toEqual('GET_ASYNC_DATA_REQUEST');
        expect(service.getAsyncData.SUCCESS).toEqual('GET_ASYNC_DATA_SUCCESS');
        expect(service.getAsyncData.FAILURE).toEqual('GET_ASYNC_DATA_FAILURE');
        const payload = 10;
        expect(service.getAsyncData(payload)).toEqual({type: 'GET_ASYNC_DATA_REQUEST', payload});
        expect(service.getAsyncData.request(payload)).toEqual({type: 'GET_ASYNC_DATA_REQUEST', payload});
        expect(service.getAsyncData.success(payload)).toEqual({type: 'GET_ASYNC_DATA_SUCCESS', payload});
        expect(service.getAsyncData.failure(payload)).toEqual({type: 'GET_ASYNC_DATA_FAILURE', payload});
    });

});