import * as React from 'react';
import * as s from './index.m.less';
import loadable from '@loadable/component';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Journet from './components/Journet';
import Submit from './components/Submit';
import Header from '../../components/Header';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IQunarIndex, cityData } from './reducer';
import { GlobalStateType } from 'src/store/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { ASYNCSETTRAINLIST } from '../TrainList/actions';
import {
  EXCHANGEFROMTO,
  SETDEPARTDATE,
  SETDATESELECTORVISIBLEDATE,
  SETCITYSELECTORVISIBLE,
  GETCITYDATA,
  SETFROM,
  SETTO,
  SETHIGHSPEED
} from './actions';

const DateSelector = loadable(() => import('../../components/DateSelector'));
const CitySelector = loadable(() => import('../../components/CitySelector'));
const { useCallback, useState } = React;
interface IQunarIndexProps {
  route: RouteComponentProps
}
interface IQunarIndexDispatchProps {
  dispatch: Dispatch
}

const QunarIndex: React.FC<IQunarIndexProps & IQunarIndex & IQunarIndexDispatchProps> = (props) =>  {
  const { dispatch, route, from, to, highSpeed } = props;
  const { isCitySelectorVisible, cityData, alphalist, departDate, isDateSelectorVisible } = props;
  const [positon, setPositon] = useState(0); // 0from 1to
  const onBack = useCallback((e: React.MouseEvent) => route.history.goBack(), []);
  const onSetPosition = useCallback((m: number) => setPositon(m), [positon]);
  const doExchangeFromTo = useCallback(() => dispatch({ type: EXCHANGEFROMTO }), [])
  const citySelector = useCallback((m: boolean) => dispatch({ type: SETCITYSELECTORVISIBLE, data: m }), [])
  const getCityData = useCallback(() => dispatch({ type: GETCITYDATA }), []);
  const onSelectFROMTO = useCallback((m: string) => {
    if (positon === 0)
      dispatch({ type: SETFROM, data: m });
    else
      dispatch({ type: SETTO, data: m});
    dispatch({ type: SETCITYSELECTORVISIBLE, data: false })
  }, [positon]);
  const dateSelector = useCallback((m: boolean) => dispatch({ type: SETDATESELECTORVISIBLEDATE, data: m }), []);
  const selectDate = useCallback((date: number) => {
    dispatch({ type: SETDEPARTDATE, data: date });
    dateSelector(false);
  }, []);
  const highSpeedToggle = useCallback((m: boolean) => dispatch({ type: SETHIGHSPEED, data: m }), []);
  const goTrainList = useCallback(() => {
    dispatch({type: ASYNCSETTRAINLIST});
    route.history.push('/trainList');
  }, [dispatch, route]);

  return (
    <>
      <Helmet>
        <title>【火车票】火车票查询</title>
      </Helmet>
      <div className={s['header']}>
        <Header title="首页" onBack={onBack}/>
        <div className={s['back-img']}></div>
        <div className={s['search-box']}>
          <Journet
            from={from}
            to={to}
            doExchangeFromTo={doExchangeFromTo}
            showCitySelector={citySelector}
            onSetPosition={onSetPosition}
          />
          <DepartDate time={departDate} onClick={dateSelector} />
          <HighSpeed highSpeed={highSpeed} onToggle={highSpeedToggle} />
          <Submit onClick={goTrainList}/>
        </div>
      </div>
      <CitySelector 
        fetchCityData={getCityData}
        show={isCitySelectorVisible}
        cityData={cityData as cityData}
        onBack={citySelector}
        onSelect={onSelectFROMTO}
        alphalist={alphalist}
      />
      <DateSelector 
        show={isDateSelectorVisible}
        onBack={dateSelector}
        onSelect={selectDate}
        departDate={departDate}
      />
    </>
  )
}

const mapStateToProps = (state: GlobalStateType): IQunarIndex => {
  return {
    ...state.QunarIndexReducer
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IQunarIndexDispatchProps => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QunarIndex)