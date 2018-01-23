import {fromJS} from "immutable";
import {Action, Redux} from "../src";

const expect = require('expect');
/***
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * https://github.com/wycats/javascript-decorators
 *
 */
describe('service', () => {
    let service;

    beforeEach(() => {

        @Redux
        class TestService {

            @Action('GET_DATA', (state, action) => state.set('data', fromJS(action.payload)))
            getData() {
            }

            // @MiddlewareAction('GET_DATA_VIA_MIDDLEWARE',
            //     (state, payload) => state.set('loading', true),
            //     (state, payload) => state.set('loading', false).set('error', null).set('data', fromJS(payload)),
            //     (state, error) => state.set('loading', false).set('error', error))
            // getDataViaMiddleware(state, payload) {
            // }

        }

        service = new TestService();
    });

    it('should change Action decorated method', () => {
        expect(service.getData.ACTION).toEqual('GET_DATA');
        const payload = 10;
        expect(service.getData(payload)).toEqual({type: 'GET_DATA', payload: payload});
    });

    it('should have filled reducers map', () => {
        expect(service.reducers).toBeTruthy();
        expect(service.reducers.size).toEqual(1);
    });
});