import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('hello saga');
}

export default function* rootSaga() {
  console.log('root saga');

  yield all([helloSaga]);
}
