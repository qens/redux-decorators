import {takeEvery, call, put} from "redux-saga/effects";
import {withReducer} from "./reducer";
import {api} from '../common';
import {SubmissionError} from "redux-form";


function* login({payload}) {
    const {username, password} = payload;
    try {
        const {error} = yield call(api.login, username, password);
        if (error) {
            yield put(withReducer.login.failure(new SubmissionError(error)));
        } else {
            yield put(withReducer.login.success(username));
        }
    } catch (err) {
        console.log(err);
    }
}

export default function* () {
    yield takeEvery(withReducer.login.REQUEST, login);
}