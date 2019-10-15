import {
  SSRGETTRAINLIST,
  SETTRAINLIST,
  ONLYTICKETS,
  ORDERTYPE,
  FILTERDATA,
  FILTERSTATE
} from './actions';

export interface TicketInfo {
  canOnlinePicking:boolean
  count: number
  countColor: number
  defaultSeatCheckStatus: number
  isSupportCandidate:boolean
  isUncheckable: number
  onlinePickingNote: string
  paperAccept:number
  perRowSeatsNum: number
  price: string
  showOnlinePicking: boolean
  studentPrice: string
  tagColor: number
  ticketId: string
  type: string
  typeColor: number
  wxSaleStatus: number
}

export interface ITrainAction {
  clickable: boolean
  id: number
  menu: string
  menuBackColor: number
  menuColor: number
  topDesc: string
  topDescBackColor: number
  topDescColor: number
  touchUrl: string
}

// filter date 
type filterType = { value: string, name: string };
export interface IFilter {
  arrStation?: Array<filterType>
  arriTimeRange?: Array<filterType>
  depStation?: Array<filterType>
  deptTimeRange?: Array<filterType>
  station?: Array<filterType>
  stationType?: Array<filterType>
  ticketType?: Array<filterType>
  trainType?: Array<filterType>
}

export interface TrainListData {
  aCity: string
  aStation: string
  aStationInfo: boolean
  aTime: string
  aTimeStr: string
  action?: ITrainAction
  appointment: boolean
  arrStationCode: string
  dCity: string
  dStation: string
  dStationInfo: boolean
  dTime: string
  dTimeStr: string
  date: string
  dayAfter: string
  distance: string
  dptStationCode: string
  endStationCode: string
  extra: string
  isPreOrder: boolean
  isSupportCandidate: boolean
  isSupportCard: boolean
  labelType: number
  noTicketSceneOptimise: boolean
  priceMsg: string
  remainTicket: string
  remainTicketBackgroundColor: number
  remainTicketColor: number
  remainTicketCount: number
  remainTicketType: number
  robSuccRate: string
  sort: number
  sortGroup: number
  startStationCode: string
  tagCode: number
  tagColor: number
  tagStyleType: number
  ticketInfos: Array<TicketInfo>
  time: string
  timeInMinute: number
  trainNumber: string
  trainShowDescColor: number
  trainStatus: number
  trainStatusDes: string
  trainType: string
}

export interface ITrainListReducer {
  trainList: Array<TrainListData>
  orderType: number
  onlyTickets: boolean
  ticketTypes: Array<{}>
  checkedTicketTypes: {}
  trainTypes: Array<{}>
  checkedTrainTypes: {}
  departStations: Array<{}>
  checkedDepartStations: {}
  arriveStations: Array<{}>
  checkedArriveStations: {}
  departTimeStart: number
  departTimeEnd: number
  arriveTimeStart: number
  arriveTimeEnd: number
  isFiltersVisible: boolean
  searchParsed: boolean
  shouleGetTrainList: boolean
  filter: IFilter
}

const initialState = {
  trainList: [],
  orderType: 7,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersVisible: false,
  searchParsed: false,
  shouleGetTrainList: false,
  filter: {}
}

export default function (state: ITrainListReducer = initialState, action: Action) {
  switch (action.type) {
    case SSRGETTRAINLIST: 
      return Object.assign({}, state, {
        shouleGetTrainList: action.data
      })
    case SETTRAINLIST: 
      return Object.assign({}, state, {
        trainList: action.data
      })
    case ONLYTICKETS:
      return Object.assign({}, state, {
        onlyTickets: action.data
      })
    case ORDERTYPE:
      return Object.assign({}, state, {
        orderType: action.data
      })
    case FILTERDATA:
      return Object.assign({}, state, {
        filter: action.data
      })
    case FILTERSTATE:
      return Object.assign({}, state, {
        isFiltersVisible: action.data
      })
    default: 
      return state
  }
}