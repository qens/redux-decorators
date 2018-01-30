import {takeEvery, call, put} from "redux-saga/effects";
import {withReducer} from "./reducer";
import {api} from '../common';
import {SubmissionError} from "redux-form";


function* login({payload}) {
    const {username, password} = payload;
    try {
        const {errors} = yield call(api.login, username, password);
        if (errors) {
            yield put(withReducer.login.failure(new SubmissionError(errors)));
        } else {
            yield put(withReducer.login.success(username));
        }
    } catch (err) {
        console.log(err);
    }
}

function* getData() {
    try {
        const data = yield call(api.getData);
        yield put(withReducer.getData.success(data));
    } catch (err) {
        yield put(withReducer.getData.failure(err));
    }
}

export default function* () {
    yield takeEvery(withReducer.login.REQUEST, login);
    yield takeEvery(withReducer.getData.REQUEST, getData);
}