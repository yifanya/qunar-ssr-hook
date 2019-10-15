import { Helmet } from 'react-helmet';
import * as React from 'react';
import loadable from "@loadable/component";
import { GlobalStateType } from '../../store/reducers'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ITrainOrderFillReducer } from './reducer';
import Header from '../../components/Header';
import { RouteComponentProps } from 'react-router-dom';
import { ASYNCGETTRAININFORM, SETTICKETINFORM, SETUSERINFORM, SETPHONENUMBER, CHOICESETAS } from './action';
import * as s from './index.m.less';
import { YYYYMMDDstring } from '../../utils/Utils';
import { Passenger } from './reducer';
const parse = require('url-parse');

import ChoiceSeat from './components/ChoiceSeat';
// const ChoiceSeat = loadable(() => import('./components/ChoiceSeat'));
const PersonInform = loadable(() => import('./components/PersonInform'));

interface ITrainOrderFill {
  route: RouteComponentProps
}
interface IMapState extends ITrainOrderFillReducer{
  departDate: number
}
interface IMapDispatch {
  getTrainInform: (m: any) => void
  setTicketInform: (m: any) => void
  setUserInform: (list: Array<Passenger>) => void
  setPhoneNumber: (m: string) => void
  changeSeatList: (s: any) => void
}

const { useCallback, useEffect, useState } = React;
const TrainOrderFill: React.FC<ITrainOrderFill & IMapState & IMapDispatch> = props => {
  const {
    route,
    departDate,
    trainInform,
    tickInform,
    phone,
    passengerList,
    choiceList,
    getTrainInform,
    setTicketInform,
    setUserInform,
    setPhoneNumber,
    changeSeatList
  } = props;

  useEffect(() => {
    const { query } = parse(window.location.href, true);
    setTicketInform({ type: query.type, price: query.price, remainTicket: query.remainTicket });
    getTrainInform({
      trainNum: query.trainNum,
      endStation: query.endStation,
      startStation: query.startStation,
      date: YYYYMMDDstring(departDate)
    });
  }, [])
  const goBack = useCallback(() => route.history.goBack(), []);
  const [phoneNum, setPhoneNum] = useState(phone);
  const setPhone: React.ChangeEventHandler<HTMLInputElement> = e => {
    const val = e.nativeEvent.target && (e.nativeEvent.target as any).value;
    setPhoneNum(val); setPhoneNumber(val);
  }

  return (
    <div style={{backgroundColor: '#f5f5f5', height: '100%', width: '100%', position: 'absolute', top: '0px', overflow: 'auto'}}>
      <Helmet>
        <title>订单填写</title>
      </Helmet>
      <div className={s['header']}>
        <Header onBack={goBack} title={'订单填写'}/>
      </div>
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
              <p className={s['trainMid']}></p>
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
      <div className={s['module']}>
        <label className={s['label']}>坐席</label>
        <p className={s['seatInfo_main']}>
          <span className={s['seatName']}>{ tickInform.type }</span>
          <span className={s['seatPrice']}>{ tickInform.price }</span>
        </p>
      </div>
      <PersonInform changeInform={setUserInform} list={passengerList}/>
      <div className={s['phone']}>
        <label>联系电话</label>
        <input className={s['phone-input']} type="text" placeholder={'通知出票信息'} onChange={setPhone} value={phoneNum}/>
      </div>
      {
        (tickInform.type === '商务座' || 
        tickInform.type === '二等座' || 
        tickInform.type === '一等座') && 
        <ChoiceSeat seatType={tickInform.type} personNum={passengerList.length} seatList={choiceList} changeSeatList={changeSeatList}/>
      }
      <section className={s['warn-title']}>
        <div>
          <span>点击提交订单表示已阅读并同意</span>
          <span className={s['signature-color']}>《预订须知》</span>，
          <span className={s['signature-color']}>《火车票服务协议》</span>
          <span>出票方：懿蕃蕃乱玩有限公司</span>
          <span className={s['signature-color']}>工商执照信息</span>
        </div>
      </section>
      <footer className={s['footer']}>
        <div className={s['allmoney']}>
          <div className={s['total-money']}>
            { tickInform.price }
          </div>
          <p className={s['amount']}>应付金额</p>
        </div>

        <button className={s['submit-pay']}>提交订单</button>
      </footer>
    </div>
  )
}


const mapStateToProps = (state: GlobalStateType): IMapState => {
  return {
    ...state.TrainOrderFillReducer,
    departDate: state.TrainTicketReducer.departDate
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatch => {
  return {
    getTrainInform (m: any) {
      dispatch({ type: ASYNCGETTRAININFORM, data: m });
    },
    setTicketInform (m: any) {
      dispatch({ type: SETTICKETINFORM, data: m })
    },
    setUserInform (list: Array<Passenger>) {
      dispatch({ type: SETUSERINFORM, data: list })
      const L = list.reduce<any[]>((prev, next) => {
        prev.push([])
        return prev;
      }, []);
      dispatch({ type: CHOICESETAS, data: L })
    },
    setPhoneNumber (m: string) {
      dispatch({ type: SETPHONENUMBER, data: m })
    },
    changeSeatList (s: any) {
      dispatch({ type: CHOICESETAS, data: s })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainOrderFill)