import { takeEvery } from 'redux-saga/effects';

function * getUserInfo(action: Action) {
  const userInfo = yield action.data;
}

export default function * () {
  yield takeEvery('saga:getUserInfo', getUserInfo)
}