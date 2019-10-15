import { TrainInformType } from '../TrainTicket/reducer';
import { SETTRAININFORM, SETTICKETINFORM, SETUSERINFORM, SETPHONENUMBER, CHOICESETAS } from './action';

// cardType 0:身份证 1:护照 2:港澳通行证 3:台胞证
export const CardList = [
  { value: '0', name: '身份证' },
  { value: '1', name: '护照' },
  { value: '2', name: '港澳通行证' },
  { value: '3', name: '台胞证' }
]
export const sex = [
  { value: '0', name: '男' },
  { value: '1', name: '女' }
]


export type Passenger = {
  name: string
  IDcard: string
  id: number
  sex?: string
  birthday?: string
  cardType: number
}
type TicketInform = {
  type: string
  price: string
  remainTicket: string
}
const initialState = {
  passengerList: [
    {
      name: '',
      IDcard: '',
      id: 0,
      sex: '男',
      cardType: 0,
      birthday: ''
    }
  ],
  choicedSeat: '',
  phone: '',
  trainInform: {} as TrainInformType,
  tickInform: {} as TicketInform,
  choiceList: [
    []
  ]
}

export interface ITrainOrderFillReducer {
  passengerList: Array<Passenger>
  choicedSeat: string
  phone: string
  trainInform: TrainInformType
  tickInform: TicketInform
  choiceList: Array<any>
}

export default function (state: ITrainOrderFillReducer = initialState, action: Action) {
  switch (action.type) {
    case SETTRAININFORM:
      return Object.assign({}, state, {
        trainInform: action.data
      })
    case SETTICKETINFORM:
      return Object.assign({}, state, {
        tickInform: action.data
      })
    case SETUSERINFORM:
      return Object.assign({}, state, {
        passengerList: action.data
      })
    case SETPHONENUMBER:
      return Object.assign({}, state, {
        phone: action.data
      })
    case CHOICESETAS: 
      return Object.assign({}, state, {
        choiceList: action.data
      })
    default:
      return state
  }
}
