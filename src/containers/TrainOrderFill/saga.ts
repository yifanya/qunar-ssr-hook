import { takeEvery, put, call } from 'redux-saga/effects';
import { LOADINGSTATE } from '../../store/globalState/actions';
import { getSeatInform as getSeatInformService } from '../../service/TrainTicket'
import { ASYNCGETTRAININFORM, SETTRAININFORM } from './action';

// 获取列车座位信息
function * getSeatInform (action: Action) {
  const { data } = action;
  const response = yield call(getSeatInformService, data);
  const trainInform = Object.assign({}, response.datas[0].train);
  delete trainInform.stations
  yield put({ type: SETTRAININFORM, data: trainInform });
  yield put({ type: LOADINGSTATE, data: false });
}

export default function * Default () {
  yield takeEvery(ASYNCGETTRAININFORM, getSeatInform);
}