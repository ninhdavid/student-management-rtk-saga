import { call, delay, fork, put, take } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';

function* handleLogin(payload: LoginPayload) {
    try {
        yield delay(1000);
        localStorage.setItem('access_token', 'fake_token');
        yield put(authActions.loginSuccess({ id: 1, name: 'fake_name' }));
        yield put(push('/admin'));
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message));
    }
}
function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    yield put(push('/login'));
}
function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }
        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
