import * as React from 'react';
import * as s from './index.m.less';
import Header from '../Header';
import Month from '../DateComponent/Month';

interface IDateSelector {
  show: boolean
  onSelect: () => void
  onBack: (m: boolean) => void
  departDate: number
}

const DateSelector: React.FC<IDateSelector> = props => {
  const { show, onSelect, onBack, departDate } = props;

  const onBackFunc = () => onBack(false);
  const monthList = t0();

  return (
    <div className={[s['date-wapper'], show ? '' : s['hidden']].join(' ')}>
      <Header title={'日期选择'}  onBack={onBackFunc}/>
      <div className={s['date-weekbanner']}>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
        <span>日</span>
      </div>
      {
        monthList.map(key => <Month startTime={key} key={key} departDate={departDate} onSelect={onSelect}/>)
      }
    </div>
  )
}

function t0 () {
  const monthList = [];
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setDate(1);
  monthList.push(date.getTime());
  date.setMonth(date.getMonth() + 1);
  monthList.push(date.getTime());
  date.setMonth(date.getMonth() + 1);
  monthList.push(date.getTime());
  return monthList;  
}

export default DateSelector;