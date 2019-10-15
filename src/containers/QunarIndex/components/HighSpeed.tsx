import * as React from 'react';
import * as s from './index.m.less';

interface IHighSpeed {
  highSpeed: boolean
  onToggle: (m: boolean) => void
}

const HighSpeed: React.FC<IHighSpeed> = props => {
  const { highSpeed, onToggle } = props;

  const toggle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  }, [onToggle])

  return (
    <div className={s['high_speed']}>
      <a className={s['am-button']}>
        <input type="checkbox" checked={highSpeed} onChange={toggle}/>
        <span className={s['tip']}>只看高铁/动车</span>
      </a>
      <a role="button" className={s['am-button']}>
        <input type="checkbox"/>
        <span className={s['tip']}>学生票</span>
      </a>
    </div>
  )
}

export default HighSpeed;