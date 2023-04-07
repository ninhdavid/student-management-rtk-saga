import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Student } from 'models';
import studentApi from 'api/student';

function* fetchDataStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fetchStudentListSuccess(response));
    } catch (err) {
        console.log('Failed to fetch student list', err);
        yield put(studentActions.fetchStudentListFailed());
    }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList, fetchDataStudentList);
    yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
