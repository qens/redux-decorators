export function Redux(target) {
    target.reducers = target.reducers || new Map();
    target.reducer = function(state = {}, action) {
        const reducer = target.reducers.get(action.type);
        return reducer ? reducer(state, action) : state;
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
        }, {ACTION: actionType});
    }
}