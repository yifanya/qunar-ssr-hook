import loadable from "@loadable/component";
import RouterView from '../components/RouterView';
import { Store } from 'redux';
import * as Global from '../store/globalState/actions';
import * as TrainList from '../containers/TrainList/actions'; 
import { YYYYMMDDstring } from '../utils/Utils';

const routers = [
  {
    path: '/',
    redirect: '/index',
    exact: true
  },
  {
    path: '/index',
    component: loadable(() => import('../containers/QunarIndex')),
    asyncData(store: Store, router: any, req: any) {
      store.dispatch({
        type: Global.GETUSERINFO,
        data: req.session.userInfo
      })
    }
  },
  {
    path: '/trainList',
    component: loadable(() => import('../containers/TrainList')),
    asyncData(store: Store, router: any, req: any, service: any) {
      store.dispatch({
        type: Global.GETUSERINFO,
        data: req.session.userInfo
      })
      const data = store.getState();
      const startStation  =  data.QunarIndexReducer.from;
      const endStation =  data.QunarIndexReducer.to;
      const departDate =  data.QunarIndexReducer.departDate;
      return new Promise((resolve, reject) => {
        service.apiService.getTrainList({
          startStation,
          endStation,
          e: 71,
          f: 3,
          wakeup: 1,
          date: YYYYMMDDstring(departDate),
          searchType: 'stasta',
          bd_source: 'qunar'
        }, (data: any) => {
          store.dispatch({
            type: TrainList.SETTRAINLIST,
            data: data.dataMap.directTrainInfo.trains
          })
          store.dispatch({ 
            type: TrainList.FILTERDATA, 
            data: data.dataMap.directTrainInfo.filter 
          })
          resolve()
        })
      })
    }
  },
  {
    path: '/trainticket',
    component: loadable(() => import('../containers/TrainTicket')),
    asyncData(store: Store, router: any, req: any) {}
  },
  {
    path: '/trainOrderFill',
    component: loadable(() => import('../containers/TrainOrderFill'))
  }
]

RouterView.transRouters(routers as Array<IRouter>);

export default routers;