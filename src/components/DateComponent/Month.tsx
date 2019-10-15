import * as React from 'react';
import * as s from './index.m.less';
import Week from './Week';
import { getHoliday } from '../../service/QunarIndex';
import { MMDDstring, DateClean } from '../../utils/Utils';

const { useEffect, useState } = React;

interface IMonth {
  startTime: number,
  onSelect: (m: number) => void
  departDate: number
}

interface IdayData{
  time: number
  holiday: boolean
  holidayName: string
  onSale: boolean
  isOverDate: boolean
}

const Month: React.FC<IMonth> = props => {
  const { startTime, onSelect, departDate } = props;
  const [weeks, setWeeks] = useState<any>([]);
  const startDay = new Date(startTime);

  useEffect(() => {
    const nowDay = DateClean();
    const startDay = new Date(startTime);
    const currentDay = new Date(startTime);
    let daysList: Array<IdayData> = [], weekList: Array<Array<IdayData>> = [];
    while (startDay.getMonth() === currentDay.getMonth()) {
      const holiday = currentDay.getDay() === 0 || currentDay.getDay() === 6;
      const onSale = nowDay.getTime() + 30 * 24 * 60 * 60 * 1000 <= currentDay.getTime() && 
        currentDay.getTime() < nowDay.getTime() + 60 * 24 * 60 * 60 * 1000;
      const isOverDate = currentDay.getTime() < nowDay.getTime() + 60 * 24 * 60 * 60 * 1000 &&
        currentDay.getTime() > nowDay.getTime() - 24 * 60 * 60 * 1000;

      daysList.push({
        time: currentDay.getTime(),
        holiday: holiday,
        holidayName: '',
        onSale,
        isOverDate
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    getHoliday(`${startDay.getFullYear()}-${startDay.getMonth() + 1}`).then((data: any) => {
      const { holiday } = data;
      const holidayList = Object.keys(holiday);
      for (let i = 0; i < holidayList.length; i++) {
        const d: IdayData = daysList.find(item => MMDDstring(item.time) === holidayList[i]) as IdayData;
        d.holiday = holiday[holidayList[i]].holiday;
        d.holidayName = d.holiday ? holiday[holidayList[i]].name : '班';
      }
      daysList = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(daysList);
      const lasyDay = new Date(daysList[daysList.length - 1].time);
      daysList = daysList.concat(new Array(lasyDay.getDay() ? 7 - lasyDay.getDay() : 0).fill(null));
      for (let i = 0; i < daysList.length / 7; i++) {
        const week = daysList.slice(i * 7, (i + 1) * 7);
        weekList.push(week);
      }
      setWeeks(weekList);
    })
  }, [startTime])

  return (
    <div className={s['month']}>
      <h3 className={s["title"]}>{ startDay.getFullYear() }年{ startDay.getMonth() + 1 }月</h3>
      {
        weeks.map((week: Array<IdayData>, index: number) => <Week departDate={departDate} onSelect={onSelect} key={index} daysList={week}/>)
      }
    </div>
  )
}

export default Month;