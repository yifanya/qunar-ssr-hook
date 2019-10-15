import { combineReducers } from 'redux';

import QunarIndexReducer from '../containers/QunarIndex/reducer';
import GlobalReducer from './globalState/globalReducer';
import TrainListReducer from '../containers/TrainList/reducer';
import TrainTicketReducer from '../containers/TrainTicket/reducer';
import TrainOrderFillReducer from '../containers/TrainOrderFill/reducer';

const reducers = combineReducers({
  QunarIndexReducer,
  GlobalReducer,
  TrainListReducer,
  TrainTicketReducer,
  TrainOrderFillReducer
});

type Reverse<T> = (state: any, action:Action) => T;

function returnResultType<T>(arg: Reverse<T>): T {
  return {} as T;
}

const GlobalState = returnResultType(reducers);
export type GlobalStateType = typeof GlobalState;
export default reducers