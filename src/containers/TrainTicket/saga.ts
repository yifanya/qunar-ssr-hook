import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ASYNCSETTRAININFORM,
  SETSEATLIST,
  SETTRAININFORM,
  SETMOMENTTABLE
} from './actions';
import { LOADINGSTATE } from '../../store/globalState/actions';
import {
  getSeatInform as getSeatInformService
} from '../../service/TrainTicket'

// 获取列车座位信息
function * getSeatInform (action: Action) {
  const { data } = action;
  const response = yield call(getSeatInformService, data);
  // console.log('response', response);
  yield put({ type: SETSEATLIST, data: response.datas[0].ticketInfos });
  yield put({ type: SETMOMENTTABLE, data: response.datas[0].train.stations });
  const trainInform = Object.assign({}, response.datas[0].train);
  delete trainInform.stations
  yield put({ type: SETTRAININFORM, data: trainInform });
  yield put({ type: LOADINGSTATE, data: false });
}

export default function * Default () {
  yield takeEvery(ASYNCSETTRAININFORM, getSeatInform);
}