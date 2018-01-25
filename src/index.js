export function Reducer(initialState) {
    return function decorator(target) {
        target.prototype.reducers = target.prototype.reducers || new Map();
        target.prototype.reducer = function (state = initialState, action) {
            const reducer = target.prototype.reducers.get(action.type);
            return reducer ? reducer(state, action) : state;
        }
    }
}

export function Action(actionType, reducer) {
    return function decorator(target, name, descriptor) {
        target.reducers = target.reducers || new Map();
        target.reducers.set(actionType, reducer);

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
export function AsyncAction(actionType, ...reducers) {
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
            }
            target.reducers.set(actions[s], reducers[i] || defaultReducer);
            return actions[s.toLocaleLowerCase()];
        })[0];

        descriptor.value = Object.assign(requestAction, actions);

    }
}