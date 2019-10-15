import * as React from 'react';
import * as s from './index.m.less';
import { connect } from 'react-redux';
import { GlobalStateType } from '../../store/reducers';
import { Dispatch } from 'redux';
import { Helmet } from 'react-helmet';
import Nav from '../TrainList/components/Nav';
import Header from '../../components/Header';
import { ITrainTicketReducer } from './reducer';
import { RouteComponentProps } from 'react-router-dom';
import { YYYYMMDDstring } from '../../utils/Utils';
import { LOADINGSTATE } from '../../store/globalState/actions';
import List from './components/List';
var parse = require('url-parse');
import {
  SETDEPARTDATE,
  ASYNCSETTRAININFORM,
  MOMENTTABLEVISIBALE
} from './actions';
import { ASYNCSETTRAINLIST } from '../TrainList/actions';

interface ITrainTicket {
  route: RouteComponentProps
}
interface IMapState extends ITrainTicketReducer{

}
interface IMapDispatch {
  changeDepartDate: (m: number) => void
  getTrainInform: (m: any) => void
  changeLoading: (m: boolean) => void
  goBackTrainList: () => void
  changeMomentTable: (m: boolean) => void
}

const { useCallback, useEffect } = React;
const TrainTicket: React.FC<ITrainTicket & IMapDispatch & IMapState> = props => {
  const {
    changeDepartDate,
    getTrainInform,
    momentTable,
    seatList,
    changeLoading,
    departDate,
    trainInform,
    route,
    goBackTrainList,
    changeMomentTable,
    momentVisiable
  } = props;

  useEffect(() => {
    const query = new parse(window.location.href, true).query;
    changeDepartDate(Number(query.departDate));
  }, []);
  useEffect(() => {
    const query = new parse(window.location.href, true).query
    const params = Object.assign({}, query, {
      date: YYYYMMDDstring(departDate)
    });
    delete params.departDate;
    changeLoading(true);
    getTrainInform(params);
  }, [departDate]);
  const goBack = useCallback(() => {
    route.history.goBack();
    goBackTrainList();
  },[route]);
  const changeDepart = useCallback((m: number) => changeDepartDate(m), [departDate]);
  const goNextPage = (m: any) => {
    route.history.push({
      pathname: '/trainOrderFill',
      search: `?startStation=${trainInform.startStation}&endStation=${trainInform.endStation}&trainNum=${trainInform.trainNumber}&type=${m.type}&price=${m.price}&remainTicket=${m.remainTicket}`
    })
  }

  return (
    <div className={s['inform-wrap']}>
      <Helmet>
        <title>{trainInform.trainNumber}</title>
      </Helmet>
      <div className={s['header']}>
        <Header onBack={goBack} title={trainInform.trainNumber}/>
      </div>
      <Nav departDate={departDate} NavClick={changeDepart}/>
      <div className={s['list-wrap']}>
        <section className={s['train-inform']} >
          <div className={s['content']}>
            <div className={s['left']}>
              <p className={s['city']}>{ trainInform.startStation }</p>
              <p className={s['time']}>{ trainInform.aTime }</p>
              <p className={s['date']}>{ trainInform.depDataValue }<span>{ trainInform.depWeek }</span></p>
            </div>
            <div className={s['middle']}>
              <p className={s['trainName']}>{ trainInform.trainNumber }<span>{ trainInform.trainType }</span></p>
              <p className={s['trainMid']}>
                <span className={s['trainMid-left']}></span>
                <span className={s['timer']} onClick={() => changeMomentTable(true)}>时刻表</span>
                <span className={s['trainMid-right']}></span>
              </p>
              <p className={s['trainTime']}>{ trainInform.timeCost }</p>
            </div>
            <div className={s['right']}>
              <p className={s['city']}>{ trainInform.endStation }</p>
              <p className={s['time']}>{ trainInform.dTime }</p>
              <p className={s['date']}>{ trainInform.arrDataValue }<span>{ trainInform.arrWeek }</span></p>
            </div>
          </div>
        </section>
      </div>
      <section className={s['seat-list']}>
        <List list={seatList} goNextPage={goNextPage}/>
      </section>
      <section className={s['moment-table-zhezhao']} style={{display: momentVisiable ? 'block' : 'none'}} onClick={() => changeMomentTable(false)}>
        <div className={s['qn-pop']} onClick={(e) => e.stopPropagation()}>
          <h1 className={s["qn_hijack"]}>列车时刻表</h1>
          <div className={s['head']}>
            <div className={s['headContent']}>
              <span className="station">车站</span>
              <span className="deptime">到达</span>
              <span className="arrtime">发车</span>
              <span className="stoptime">停留时间</span>
            </div>
          </div>
          <ul className={s['main']}>
            {
              momentTable.map((item, index) => (
                <li key={item.name}>
                  <div className={(index === 0 || index === momentTable.length - 1) ? s['icon-red'] : s['icon']}>
                    { index === 0 && '出' || index === momentTable.length - 1 && '到' || index + 1 }
                  </div>
                  <div className={s['mainContent']}>
                    <span className="station red">{ item.name }</span>
                    <span className="deptime grey">{ item.arrTime }</span>
                    <span className="arrtime red">{ item.depTime }</span>
                    <span className="stoptime grey">{ item.stayTime || '-'}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = (state: GlobalStateType) => {
  return {
    ...state.TrainTicketReducer
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeDepartDate: (m: number) => {
      dispatch({ type: SETDEPARTDATE, data: m})
    },
    getTrainInform (m: any) {
      dispatch({ type: ASYNCSETTRAININFORM, data: m })
    },
    changeLoading (m: boolean) {
      dispatch({ type: LOADINGSTATE, data: m });
    },
    goBackTrainList () {
      dispatch({type: ASYNCSETTRAINLIST});
    },
    changeMomentTable (m: boolean) {
      dispatch({ type: MOMENTTABLEVISIBALE, data: m })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainTicket);