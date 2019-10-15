import * as React from 'react';
import * as s from './index.m.less';
import * as dayjs from 'dayjs';

const { useState, useEffect, useMemo } = React;

enum Week {
  '天',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
}

interface IDepartDate {
  time: number
  onClick: (m: boolean) => void
}

const DepartDate: React.FC<IDepartDate> = props => {
  const { time, onClick } = props;

  const t0OfDepartTime = t0(time);
  const [isToday, setisToday] = useState(false);
  const departTime = useMemo(() => {
    const date = dayjs(t0OfDepartTime);
    return {
      weekNum: date.day(),
      YD: date.format('MM月DD日')
    };
  }, [t0OfDepartTime])

  useEffect(() => {
    setisToday(departTime.YD === dayjs(Date.now()).format('MM月DD日'));
  })

  return (
    <div className={s['time']} onClick={() => onClick(true)}>
      <a role="button">
        <span className={s['date']}>{ departTime.YD }</span>
        <span className={s['week']}>{ '周' + Week[departTime.weekNum] }{isToday ? '（今天）' : '' }</span>
      </a>
    </div>
  )
}

function t0 (timesheet: number = Date.now()) {
  const date = new Date(timesheet);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export default DepartDate