import * as React from 'react';
import * as s from './index.m.less';
import Nav from './components/Nav';
import Header from '../../components/Header';
import NavBottom from './components/NavBottom';
import List from './components/TrainList/List';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalStateType } from 'src/store/reducers';
import { ITrainListReducer } from './reducer';
import { Dispatch } from 'redux';
import { SETDEPARTDATE, SETHIGHSPEED } from '../QunarIndex/actions';
import { ASYNCSETTRAINLIST, FILTERSTATE, ONLYTICKETS, ORDERTYPE, FILTERDATA } from './actions';
import { LOADINGSTATE } from '../../store/globalState/actions';

interface ITrainList {
  route: RouteComponentProps
}
interface IStoreState extends ITrainListReducer{
  from: string
  to: string
  departDate: number
  highSpeed: boolean
}
interface IStoreDispatch {
  setDepartDate: (m: number) => void
  getTrainList: () => void
  changeFiltersState: (m: boolean) => void
  changeHighState: (m: boolean) => void
  changeOnlyTickets: (m: boolean) => void
  changeOrderType: (m: number) => void
  changeFilterTrainListInform: (m: Action) => void
  updateTrainList: (m: Action) => void
  cleanFilterData: (m: any) => void
}

const { useCallback } = React;

const TrainList: React.FC<ITrainList & IStoreState & IStoreDispatch> = props => {
  const { route, from, to, trainList, highSpeed, onlyTickets, orderType, isFiltersVisible } = props;
  const { 
    departDate, 
    setDepartDate, 
    getTrainList,
    changeFiltersState,
    changeHighState,
    changeOnlyTickets,
    changeOrderType,
    filter,
    changeFilterTrainListInform,
    updateTrainList,
    cleanFilterData
  } = props;
  const onPopPage = useCallback(() => { 
    route.history.goBack();
    cleanFilterData({});
  }, [route]);
  const NavClick = useCallback((m: number) => {
    console.log('m', m);
    setDepartDate(m);
    getTrainList();
  }, [departDate]);

  return (
    <>
      <Helmet>
        <title>{ `${from} -> ${to} 火车票` }</title>
      </Helmet>
      <div className={s['train-wrapper']}>
        <div className={s['header']}>
          <Header onBack={onPopPage} title={`${from} -> ${to}`} />
        </div>
        <Nav NavClick={NavClick} departDate={departDate}/>
        <div className={s['list-wrap']}>
          <List List={trainList} route={route} departDate={departDate}/>
        </div>
        <NavBottom
          filter={filter}
          highSpeed={highSpeed}
          orderType={orderType}
          isFiltersVisible={isFiltersVisible}
          onlyTickets={onlyTickets}
          changeFiltersState={changeFiltersState}
          changeHighState={changeHighState}
          changeOnlyTickets={changeOnlyTickets}
          changeOrderType={changeOrderType}
          changeFilterTrainListInform = {changeFilterTrainListInform}
          updateTrainList={updateTrainList}
          route={route}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state: GlobalStateType) => {
  return {
    ...state.TrainListReducer,
    from: state.QunarIndexReducer.from,
    to: state.QunarIndexReducer.to,
    highSpeed: state.QunarIndexReducer.highSpeed,
    departDate: state.QunarIndexReducer.departDate
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setDepartDate(m: number) {
      dispatch({ type: SETDEPARTDATE, data: m })
    },
    getTrainList () {
      dispatch({ type: ASYNCSETTRAINLIST })
      dispatch({ type: LOADINGSTATE, data: true })
    },
    changeFiltersState (m: boolean) {
      dispatch({ type: FILTERSTATE, data: m })
    },
    changeHighState (m: boolean) {
      dispatch({ type: SETHIGHSPEED, data: m })
    },
    updateTrainList (m: Action) {
      dispatch({ type: ASYNCSETTRAINLIST, data: m.data})
      dispatch({ type: LOADINGSTATE, data: true })
    },
    changeOnlyTickets (m: boolean) {
      dispatch({ type: ONLYTICKETS, data: m })
      dispatch({ type: ASYNCSETTRAINLIST })
      dispatch({ type: LOADINGSTATE, data: true })
    },
    changeOrderType (m: number) {
      dispatch({ type: ORDERTYPE,data: m })
      dispatch({ type: ASYNCSETTRAINLIST })
      dispatch({ type: LOADINGSTATE, data: true })
    },
    changeFilterTrainListInform (m: Action) {
      dispatch({ type: FILTERSTATE, data: false })
      dispatch({ type: ASYNCSETTRAINLIST, data: m.data })
      dispatch({ type: LOADINGSTATE, data: true })
    },
    cleanFilterData (m: any) {
      dispatch({ type: FILTERDATA, data: m });
    }
  }
}

export default connect<IStoreState, IStoreDispatch>(mapStateToProps, mapDispatchToProps)(TrainList);