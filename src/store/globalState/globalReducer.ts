import { GETUSERINFO, LOADINGSTATE } from './actions';

interface Iglobal {
  userInfo: {
    login?: string,
    id?: number,
    node_id?: string,
    avatar_url?: string,
    url?: string,
    email?: string
  }
  loading: boolean
}

const InitialState = {
  userInfo: {
    login: '',
    id: undefined,
    node_id: '',
    avatar_url: '',
    url: '',
    email: ''
  },
  loading: false
}

export default function reducer (state: Iglobal = InitialState, action: Action) {

  switch (action.type) {
    case GETUSERINFO: 
      return Object.assign({}, state, {
        userInfo: action.data || InitialState
      })
    case LOADINGSTATE:
      return Object.assign({}, state, {
        loading: action.data
      })
    default: 
      return state
  }
}