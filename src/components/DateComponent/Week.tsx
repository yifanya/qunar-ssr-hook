import * as React from 'react';
import * as s from './index.m.less';
import Day from './Day';

interface IdayData{
  time: number
  holiday: boolean
  holidayName: string
  onSale: boolean
  isOverDate: boolean
}

interface IWeek {
  onSelect: (m: number) => void
  daysList: Array<IdayData>
  departDate: number
}

const Week: React.FC<IWeek> = props => {
  const { onSelect, daysList, departDate } = props;

  return (
    <div className={s['week']}>
      {
        daysList.map((dayItem, index) => <Day departDate={departDate} onSelect={onSelect} key={index} day={dayItem}/>)
      }
    </div>
  )
}

export default Week