import { all, fork } from 'redux-saga/effects';
import QunarIndex from '../containers/QunarIndex/saga';
import Global from './globalState/globalSagas';
import TrainList from '../containers/TrainList/saga';
import TrainTicket from '../containers/TrainTicket/saga';
import TrainOrderFill from '../containers/TrainOrderFill/saga';

export default function * rootSagas () {
  yield all([
    fork(Global),
    fork(QunarIndex),
    fork(TrainList),
    fork(TrainTicket),
    fork(TrainOrderFill)
  ])
}