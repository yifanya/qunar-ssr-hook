import * as React from 'react';
import * as s from './index.m.less';
import { DateClean } from '../../utils/Utils';

interface IDay {
  onSelect: (m: number) => void
  day: IdayData
  departDate: number
}

interface IdayData{
  time: number
  holiday: boolean
  holidayName: string
  onSale: boolean
  isOverDate: boolean
}

const Day: React.FC<IDay> = props => {
  const {day, onSelect, departDate} = props;
  const date = !day ? null : DateClean(day.time);
  const toDay = DateClean();
  const selectDay = DateClean(departDate);
  const select = React.useCallback(() => {
    onSelect(day.time);
  }, []);
  const nullCallBack = React.useCallback(() => {}, []);

  return (
    <a className={
          [s['day-item'], 
          !day ? s['hidden-day-block'] : '', 
          day && day.holiday ? s['holiday'] : '',
          day && !day.isOverDate ? s['disabled'] : '',
          date && date.getTime() === selectDay.getTime() ? s['selected'] : ''
          ].join(' ')
        } onClick={ day && day.isOverDate ? select : nullCallBack}>
      { day ?
        <>
          <span className={[s['toptip']].join(' ')}>
            { day.holidayName }
          </span> 
          <span>
            { 
              date ? date.getTime() === toDay.getTime() ? '今天' : date.getDate() : ''
            }
          </span>
          { !day.onSale ? '' : <span className={s['bottomtip']}>预约</span> }
        </> : 
        <span>
          { date ? date.getTime() === toDay.getTime() ? '今天' : date.getDate() : '' }
        </span>
      }
    </a>
  )
}

export default Day