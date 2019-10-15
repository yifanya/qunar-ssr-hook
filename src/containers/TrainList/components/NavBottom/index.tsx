import * as React from 'react';
import * as s from './index.m.less';
import FilterBox from './filterBox';
import { IFilter } from '../../reducer';
import RangeSilder from '../../../../components/RangeSlider';
import { RouteComponentProps } from 'react-router-dom';

interface INavBottom {
  isFiltersVisible: boolean
  onlyTickets: boolean
  orderType: number
  highSpeed: boolean
  filter: IFilter
  route: RouteComponentProps
  changeFiltersState: (m: boolean) => void  // 修改大查询框是否显示的
  changeHighState: (m: boolean) => void     // 高铁动车的
  changeOnlyTickets: (m: boolean) => void   // 查询是否有票的
  changeOrderType: (m: number) => void      // 修改出发早到晚还是时间长到短的
  changeFilterTrainListInform: (m: Action) => void
  updateTrainList: (m: Action) => void
}

const { useCallback, useReducer, useState, useEffect } = React;

const NavBottom: React.FC<INavBottom> = props => {
  const {
    filter,
    isFiltersVisible,
    onlyTickets,
    orderType,
    highSpeed,
    changeFiltersState,
    changeHighState,
    changeOnlyTickets,
    changeOrderType,
    changeFilterTrainListInform,
    updateTrainList
  } = props;
  const FilterReducer = useCallback((state: any, action: Action) => {
    switch (action.type) {
      case 'ticketType':
        return Object.assign({}, state, {
          ticketType: action.data
        })
      case 'trainType':
        if (action.data.indexOf('5') >= 0 && action.data.indexOf('1') >= 0) changeHighState(true);
        else changeHighState(false);
        return Object.assign({}, state, {
          trainType: action.data
        })
      case 'depStation':
        return Object.assign({}, state, {
          depStation: action.data
        })
      case 'arrStation':
        return Object.assign({}, state, {
          arrStation: action.data
        })
      case 'filterNewDepTimeRange':
        return Object.assign({}, state, {
          filterNewDepTimeRange: action.data
        })
      case 'filterNewArrTimeRange':
        return Object.assign({}, state, {
          filterNewArrTimeRange: action.data
        })
      case 'CLEAR':
        changeHighState(false);
        return Object.assign({}, initialFilterData, {
          filterDate: {
            start: 0,
            end: 24
          }
        });
      default:
        throw new Error('NavBottom component\'s useReducer FilterReducer action.type not find')
    }
  }, []);
  const initialFilterData = {
    ticketType: [],
    trainType: [],
    arrStation: [],
    depStation: [],
    filterDate: {
      start: 0,
      end: 24
    }
  }

  const [filterState, filterDispatch] = useReducer(FilterReducer, initialFilterData);
  const changeOnlyTicketsClick = useCallback(() => changeOnlyTickets(!onlyTickets), [changeOnlyTickets, onlyTickets]);
  const changeHighClick = useCallback(() => {
    changeHighState(!highSpeed);
    updateTrainList({ type: '', data: {filterTrainType: !highSpeed? ['5', '1'].join(',') : ''} })
    if (!highSpeed) filterDispatch({ type: 'trainType', data: ['5', '1'] });
    else {
      const arr: string[] = [];
      for (let i = 0; i < filterState.trainType; i++) {
        if (filterState.trainType[i] !== '5' && filterState.trainType[i] !== '1') 
          arr.push(filterState.trainType[i]);
      }
      filterDispatch({ type: 'trainType', data: arr });
    }
  }, [changeHighState, highSpeed, filterState]);
  const changeFilterClick = useCallback((m: boolean) => changeFiltersState(m), [changeFiltersState]);
  const changeOrderTypeClick = useCallback(() => changeOrderType(orderType === 7 ? 0 : 7), [changeOrderType, orderType]);
  const handleOK = useCallback(() => {
    console.log('filterState', filterState);
    filterDispatch({ type: 'CLEAR' });
    changeFilterTrainListInform({
      type: '', 
      data: {
        filterTicketType: filterState.ticketType.join(',') || '',
        filterTrainType: filterState.trainType.join(',') || '',
        filterStation: [...filterState.arrStation, ...filterState.depStation].join(',') || '',
        filterNewDepTimeRange: filterState.filterNewDepTimeRange,
        filterNewArrTimeRange: filterState.filterNewArrTimeRange
      }
    })
  },[filterState]);
  const handleReset = useCallback(() => filterDispatch({ type: 'CLEAR' }),[filterDispatch]);
  const [comprehensiveSortState, setComprehensiveSortState ] = useState(false);

  useEffect(() => {
    setComprehensiveSortState(false);
    Object.keys(filterState).forEach(item => {
      if (filterState[item].length > 0) setComprehensiveSortState(true);
    })
  }, [filterState]);

  return (
    <>
      <section className={s['btn-filter-wrap']}>
        <div
          className={[s['btn-filter-item']].join(' ')}
          onClick={changeOrderTypeClick}
        >
          <i className="iconfont icon-shijian"></i>
          <span>
            { orderType === 7 && '出发 早->晚' }
            { orderType === 0 && '耗时 短->长' }  
          </span>
        </div>
        <div 
          className={[s['btn-filter-item'], highSpeed ? s['checked-item'] : ''].join(' ')}
          onClick={changeHighClick}
        >
          <i className="iconfont icon-gaotiedongche"></i>
          <span>只看高铁动车</span>
        </div>
        <div
          className={[s['btn-filter-item'], onlyTickets ? s['checked-item'] : ''].join(' ')}
          onClick={changeOnlyTicketsClick}
        >
          <i className="iconfont icon-menpiao"></i>
          <span>只看有票</span>
        </div>
        <div className={[s['btn-filter-item'], comprehensiveSortState ? s['checked-item'] : ''].join(' ')} onClick={() => changeFilterClick(true)}>
          <i className="iconfont icon-funnel"></i>
          <span>综合筛选</span>
        </div>
      </section>
      <div className={s['filter-menu-modal']} style={{display: isFiltersVisible ? 'block' : 'none'}} onClick={() => changeFilterClick(false)}>
        <div className={s['filter-menu']} onClick={(e) => e.stopPropagation()}>
          <div className={s['filter-title']}>
            <span onClick={handleReset} className={s['resets']}>重置</span>
            <span onClick={handleOK} className={s['ok']}>确认</span>
          </div>
          <div style={{marginTop: '.4rem'}}>
            <FilterBox filterArr={filterState['ticketType'] || []} data={filter.ticketType || []} title={'坐席类别'} name={'ticketType'} onChange={filterDispatch}/>
            <FilterBox filterArr={filterState['trainType'] || []} data={filter.trainType || []} title={'车次类型'} name={'trainType'} onChange={filterDispatch}/>
            <FilterBox filterArr={filterState['depStation'] || []} data={filter.depStation || []} title={'出发车站'} name={'depStation'} onChange={filterDispatch}/>
            <FilterBox filterArr={filterState['arrStation'] || []} data={filter.arrStation || []} title={'到达车站'} name={'arrStation'} onChange={filterDispatch}/>
            <FilterBox title={'出发时间'} name={'1'}>
              <RangeSilder onChange={filterDispatch} filterDate={initialFilterData.filterDate} name={'filterNewDepTimeRange'}/>
            </FilterBox>
            <FilterBox title={'到达时间'} name={'2'}>
              <RangeSilder onChange={filterDispatch} filterDate={initialFilterData.filterDate} name={'filterNewArrTimeRange'}/>
            </FilterBox>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBottom;