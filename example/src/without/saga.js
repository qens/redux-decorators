import {takeEvery, call, put} from "redux-saga/effects";
import {api} from "../common";
import {actionTypes} from "./action-types";

function* getData() {
    try {
        const data = yield call(api.getData);
        yield put({type: actionTypes.GET_DATA_SUCCESS, payload: data});
    } catch (err) {
        yield put({type: actionTypes.GET_DATA_FAILURE, payload: err});
    }
}

export default function* () {
    yield takeEvery(actionTypes.GET_DATA_REQUEST, getData);
}