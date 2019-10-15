
import { DateClean } from '../../utils/Utils';
import {
  SETMOMENTTABLE,
  SETSEATLIST,
  SETTRAININFORM,
  SETDEPARTDATE,
  MOMENTTABLEVISIBALE
} from './actions';

export type TrainMoment = {
  name: string              // 车站名称
  arrTime: string           // 到达时间
  depTime: string           // 出发时间
  stayTime: string          // 等待时间
  no: string
}

export type SeatInform = {
  type: string                // 座位等级
  price: string               // 座位价格
  remainTicket: string        // 座位余票
}

export interface ITrainTicketReducer {
  momentTable: Array<TrainMoment>       // 列车停车时刻表
  seatList: Array<SeatInform>           // 座位列表
  departDate: number                    // 当前日期
  trainInform: TrainInformType          // 列车信息
  momentVisiable: boolean
}

export type TrainInformType = {
  aTime: string
  allMileage: string
  allTime: string
  arrDataValue: string
  arrStationCode: string
  arrWeek: string
  arrivalTime: string
  canOnlinePickingTrain: boolean
  dTime: string
  dayAfter: string
  depDataValue: string
  depWeek: string
  departureTime: string
  direct: string
  dptStationCode: string
  endStation: string
  endStationCode: string
  intervalMileage: string
  intervalPrice: string
  intervalTime: string
  startStation: string
  startStationCode: string
  timeCost: string
  trainNumber: string
  trainType: string
}

const initialState = {
  momentTable: [],
  seatList: [],
  trainInform: {} as TrainInformType,
  departDate: DateClean().getTime(),
  momentVisiable: false
}

export default function (state: ITrainTicketReducer = initialState, action: Action) {
  switch (action.type) {
    case SETMOMENTTABLE: 
      return Object.assign({}, state, {
        momentTable: action.data
      })
    case SETSEATLIST:
      return Object.assign({}, state, {
        seatList: action.data
      })
    case SETTRAININFORM:
      return Object.assign({}, state, {
        trainInform: action.data
      })
    case SETDEPARTDATE:
      return Object.assign({}, state, {
        departDate: action.data
      })
    case MOMENTTABLEVISIBALE: 
      return Object.assign({}, state, {
        momentVisiable: action.data
      })
    default:
      return state;
  }
}