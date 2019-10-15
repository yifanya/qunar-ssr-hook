import * as React from 'react';
import * as s from './index.m.less';
import { TicketInfo } from '../../reducer';
import { RouteComponentProps } from 'react-router-dom';

// const { memo, useCallback, useState } = React;

export interface IListItem {
  dTime: string
  aTime: string
  dStation: string
  aStation: string
  trainNumber: string
  priceMsg: string
  time: string // 持续时间
  dayAfter: string // 是否跨天
  date: string // 当天时间
  ticketInfos: Array<TicketInfo>
  trainStatus: number
  route: RouteComponentProps
  departDate: number
}

const ListItem: React.FC<IListItem> = props => {
  const {
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    priceMsg,
    time,
    dayAfter,
    ticketInfos,
    trainStatus,
    route,
    departDate
  } = props;

  const goTrainDetail = React.useCallback(() => {
    console.log(trainStatus, '~~~gogogo', props);
    if (trainStatus === 3 || trainStatus === 2) return;
    route.history.push({
      pathname: '/trainticket',
      search: `?startStation=${dStation}&endStation=${aStation}&departDate=${departDate}&trainNum=${trainNumber}`
    })
  }, [route, departDate, dStation, aStation, trainNumber]);

  // 4已售空可抢票 3已发车 1有余票可预订 2已停售
  return (
    <li className={s['list-wrap-item']} onClick={goTrainDetail}>
      <span className={s['time']}>
        <em>{ dTime }</em>
        <br/>
        <em className={s['list-item-bottom']}>
          { aTime }
          { dayAfter && <i className={s['dayAfter']}>{ dayAfter }</i> }
        </em>
      </span>
      <span className={s['station']}>
        <em><i className={s['startStation']}>始</i>{ dStation }</em>
        <br/>
        <em className={s['list-item-bottom']}><i className={s['endStation']}>终</i>{ aStation }</em>
      </span>
      <span className={s['train']}>
        <em>{ trainNumber }</em>
        <br/>
        <em className={s['list-item-bottom']}>{ time }</em>
      </span>
      {
        trainStatus === 1 &&  <span className={s['price']}>
                                <em className={s['list-item-orange']}>{ priceMsg }</em>
                                <br/>
                                <em className={s['list-item-bottom']}>
                                  { 
                                    ticketInfos[0].count > 0 ? ticketInfos[0].type :
                                      ticketInfos[1].count > 0 ? ticketInfos[1].type :
                                        ticketInfos[2].type
                                  }
                                  <i className={s['list-item-orange']}>
                                    { 
                                      ticketInfos[0].count > 0 ? ticketInfos[0].count :
                                        ticketInfos[1].count > 0 ? ticketInfos[1].count :
                                          ticketInfos[2].count
                                    }张
                                  </i>
                                </em>
                              </span>
      }
      {
        trainStatus === 2 &&  <span className={s['list-item-none']}> <i>已停售</i> </span>
      }
      {
        trainStatus === 3 &&  <span className={s['list-item-none']}> <i>已发车</i> </span>
      }
      {
        trainStatus === 4 &&  <span className={s['price']}>
                                <em className={s['list-item-orange']}>{ priceMsg }</em>
                                <br/>
                                <em className={s['list-item-bottom']}><i className={s['list-item-orange']}>可抢票</i></em>
                              </span>
      }
      {
        trainStatus === 5 
      }
      {
        trainStatus === 6 &&  <span className={s['price']}>
                                <em className={s['list-item-orange']}>{ priceMsg }</em>
                                <br/>
                                <em className={s['list-item-bottom']}><i className={s['list-item-orange']}>可抢票</i></em>
                              </span>
      }
    </li>
  )
}

export default ListItem;