/**
 * This decorator for class, create a property "_reducers" to store sub reducers,
 * and added method "reducer", which should be combined with others and included in app
 * @example <caption>
 *  @Reducer({data: null})
 *  class MainReducer { ... }
 *  </caption>
 * @param initialState
 * @returns {decorator}
 * @constructor
 */
export function Reducer(initialState) {
    return function decorator(target) {
        target.prototype._reducers = target.prototype._reducers || new Map();
        target.prototype.reducer = function (state = initialState, action) {
            const reducer = target.prototype._reducers.get(action.type);
            return reducer ? reducer(state, action) : state;
        }
    }
}


/**
 * Decorate a method and change his type;
 * Invocation as a method returns redux action object (class.method() => {type, payload})
 * But you also can get a property of this function without invocation (class.method.ACTION = actionType)
 * @param actionType
 * @param reducer : (state, action) => //... return state; // will be stored in class.prototype._reducers
 * @returns {decorator}
 * @constructor
 */
export function Action(actionType, reducer) {
    return function decorator(target, name, descriptor) {
        target._reducers = target._reducers || new Map();
        target._reducers.set(actionType, reducer);

        descriptor.value = Object.assign(function (payload) {
            return {
                type: actionType,
                payload
            };
        }, { ACTION: actionType });
    }
}


const statuses = ['REQUEST', 'SUCCESS', 'FAILURE'];
const defaultReducer = state => state;
/**
 * After decoration property will have
 * class.method() => {type: REQUEST, payload}
 * class.method.request() => {type: REQUEST, payload} // the same as default class.method()
 * class.method.success() => {type: SUCCESS, payload}
 * class.method.failure() => {type: FAILURE, payload}
 * class.method.REQUEST = REQUEST
 * class.method.SUCCESS = SUCCESS
 * class.method.FAILURE = FAILURE
 *
 * @param actionType
 * @param reducers - expected reducers [request, success, failure] // will be stored in class.prototype._reducers
 * @returns {decorator}
 * @constructor
 */
export function AsyncAction(actionType, ...reducers) {
    return function decorator(target, name, descriptor) {
        target._reducers = target._reducers || new Map();
        const actions = {};
        const requestAction = statuses.map((s, i) => {
            actions[s] = `${actionType}_${s}`;
            actions[s.toLocaleLowerCase()] = function (payload) {
                return {
                    type: actions[s],
                    payload
                };
            }
            target._reducers.set(actions[s], reducers[i] || defaultReducer);
            return actions[s.toLocaleLowerCase()];
        })[0];

        descriptor.value = Object.assign(requestAction, actions);

    }
}