import { takeEvery, put, select, takeLatest, call } from 'redux-saga/effects';
import {
  SETFROM,
  SETTO,
  EXCHANGEFROMTO,
  GETCITYDATA,
  SETCITYDATE,
  SETAPLHALIST
} from './actions';
import {
  getCityData
} from '../../service/QunarIndex';

import { GlobalStateType } from '../../store/reducers';

function * ExchangeFromTo () {
  const {to, from} = yield select<(s:GlobalStateType) => typeof s.QunarIndexReducer >(state => state.QunarIndexReducer);
  yield put({
    type: SETFROM,
    data: to
  }),
  yield put({
    type: SETTO,
    data: from
  })
}

function * getCityDataSAGA () {
  const { expires = 0, cityData } = JSON.parse(localStorage.getItem('city-data-catch') || '{}');
  let data = null;
  if (Date.now() > expires) {
    const res = yield call(getCityData);
    data = res.staData;
    localStorage.setItem(
      'city-data-catch',
      JSON.stringify({ expires: Date.now() + 24 * 60 * 1000, cityData: data })
    );
  }
  else 
    data = cityData;
  const alphaList = data.cityList.map((item: any) => {
    return item.title || null;
  }).filter((item: boolean) => item);
  alphaList.unshift('热门')
  alphaList.unshift('定位');
  yield put({type: SETAPLHALIST, data: alphaList})
  yield put({type: SETCITYDATE, data});
}

export default function * Default () {
  yield takeEvery(EXCHANGEFROMTO, ExchangeFromTo)
  yield takeLatest(GETCITYDATA, getCityDataSAGA)
}