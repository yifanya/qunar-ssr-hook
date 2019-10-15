import {
  SETFROM,
  SETTO,
  SETCITYSELECTORVISIBLE,
  SETCITYDATE,
  SETAPLHALIST,
  SETDATESELECTORVISIBLEDATE,
  SETDEPARTDATE,
  SETHIGHSPEED
} from './actions';
import { DateClean } from '../../utils/Utils';

type citys = Array<{ name: string }>;
type cityList = Array<{ citys: citys, title: string }>;
export type cityData = {
  hotCities: citys,
  cityList: cityList,
  version: number
}
export interface IQunarIndex {
  from: string,
  to: string,
  isCitySelectorVisible: boolean,
  currentSelectingLeftCity: boolean,
  cityData?: cityData,
  isDateSelectorVisible: boolean,
  highSpeed: boolean,
  alphalist: string[],
  departDate: number
}

const InitialState = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,
  isDateSelectorVisible: false,
  highSpeed: false,
  alphalist: [],
  departDate: DateClean().getTime()
}

export default function reducer (state: IQunarIndex = InitialState, action: Action) {
  switch (action.type) {
    case SETFROM: 
      return Object.assign({}, state, {
        from: action.data
      });
    case SETTO:
      return Object.assign({}, state, {
        to: action.data
      })
    case SETCITYSELECTORVISIBLE:
      return Object.assign({}, state, {
        isCitySelectorVisible: action.data
      })
    case SETCITYDATE:
      return Object.assign({}, state, {
        cityData: action.data
      })
    case SETAPLHALIST: 
      return Object.assign({}, state, {
        alphalist: action.data
      })
    case SETDATESELECTORVISIBLEDATE:
      return Object.assign({}, state, {
        isDateSelectorVisible: action.data
      })
    case SETDEPARTDATE:
      return Object.assign({}, state, {
        departDate: action.data
      })
    case SETHIGHSPEED:
      return Object.assign({}, state, {
        highSpeed: action.data
      })
    default:
      return state
  }
}