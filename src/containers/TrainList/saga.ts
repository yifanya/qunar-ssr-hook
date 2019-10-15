import { put, select, call, takeLatest } from 'redux-saga/effects';
import {
  ASYNCSETTRAINLIST,
  SETTRAINLIST,
  FILTERDATA
} from './actions';
import { GlobalStateType } from '../../store/reducers';
import {
  getTrainList
} from '../../service/TrainList';
import { LOADINGSTATE } from '../../store/globalState/actions';
import { YYYYMMDDstring } from '../../utils/Utils';

function * getTrainListSaga (action: Action) {
  const {
    filterTicketType = '',
    filterTrainType = '',
    filterStation = '',
    filterNewDepTimeRange = '00:00-24:00',
    filterNewArrTimeRange = '00:00-24:00'
  } = action.data ? action.data : {};
  const { startStation, endStation, departDate, onlyTickets, sort, filter } = yield select((state: GlobalStateType) => ({
    startStation : state.QunarIndexReducer.from,
    endStation: state.QunarIndexReducer.to,
    departDate: state.QunarIndexReducer.departDate,
    onlyTickets: state.TrainListReducer.onlyTickets,
    sort: state.TrainListReducer.orderType,
    filter: state.TrainListReducer.filter
  }));
  try {
    const fetchDate = yield call(getTrainList, {
      startStation,
      endStation,
      e: 71,
      f: 3,
      wakeup: 1,
      departDate: YYYYMMDDstring(departDate),
      filterTrainType,
      onlyTickets: onlyTickets ? 1 : 0,
      sort,
      filterTicketType,
      filterStation,
      filterNewDepTimeRange,
      filterNewArrTimeRange
    });
    if (fetchDate && fetchDate.dataMap && fetchDate.dataMap.directTrainInfo) {
      yield put({ type: SETTRAINLIST, data: fetchDate.dataMap.directTrainInfo.trains });
      if (Object.keys(filter).length === 0)
        yield put({ type: FILTERDATA, data: fetchDate.dataMap.directTrainInfo.filter });
    }
    else
      yield put({ type: SETTRAINLIST, data: [] });
    yield put({ type: LOADINGSTATE, data: false });
  } catch (error) {
    yield put({ type: LOADINGSTATE, data: false });
  }
}

export default function * Default () {
  yield takeLatest(ASYNCSETTRAINLIST, getTrainListSaga);
}