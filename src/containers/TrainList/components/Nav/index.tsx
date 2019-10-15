import * as React from 'react';
import * as s from './index.m.less';
import { DateClean } from '../../../../utils/Utils';

enum Week {
  '天',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
}

interface INav {
  departDate: number
  NavClick: (m: number) => void
}
const { useCallback } = React;

const Nav: React.FC<INav> = props => {
  const { departDate, NavClick } = props;
  const nowDate = DateClean();
  const depDate = DateClean(departDate);
  const endDate = DateClean(Date.now() + 59 * 24 * 60 * 60 * 1000);

  const prevDay = useCallback(() => {
    const number = depDate.getTime() - 24 * 60 * 60 * 1000;
    if (nowDate.getTime() === depDate.getTime()) return;
    NavClick(number);
  }, [NavClick]);

  const nextDay = useCallback(() => {
    const number = depDate.getTime() + 24 * 60 * 60 * 1000;
    if (depDate.getTime() === endDate.getTime()) return;
    NavClick(number);
  }, [NavClick]);

  return (
    <div className={s['nav']}>
      <div
        className={[s['left'], nowDate.getTime() === depDate.getTime() ? s['disabled'] : ''].join(' ')} 
        onClick={prevDay}>
          前一天
      </div>
      <div className={s['center']}>{ `${depDate.getMonth() + 1}月${depDate.getDate()}日 周${Week[depDate.getDay()]}` }</div>
      <div
        className={[s['right'], depDate.getTime() === endDate.getTime() ? s['disabled'] : ''].join(' ')} 
        onClick={nextDay}>
          后一天
      </div>
    </div>
  )
}

export default Nav;