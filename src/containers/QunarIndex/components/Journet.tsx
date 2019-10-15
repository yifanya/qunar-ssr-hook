import * as React from 'react';
import * as s from './index.m.less';
import switchImg from '../imgs/switch.svg';

interface IJournet {
  from: string
  to: string
  doExchangeFromTo: React.MouseEventHandler
  showCitySelector: (m: boolean) => void
  onSetPosition: (m: number) => void
}

export default function (props: IJournet) {
  const { from, to, doExchangeFromTo, showCitySelector, onSetPosition } = props;

  const handleCityFromClick = React.useCallback((e: React.MouseEvent) => {
    onSetPosition(0);
    showCitySelector(true)
  }, [onSetPosition])
  const handleCityToClick = React.useCallback((e: React.MouseEvent) => {
    onSetPosition(1);
    showCitySelector(true)
  }, [onSetPosition])

  return (
    <div className={s['journey']}>
      <div className={s['station']} onClick={handleCityFromClick}>
        <input type="text" className={[s['input'], s['from']].join(' ')} value={from} readOnly/>
      </div>
      <div className={[s['switch'], s['station']].join(' ')} onClick={doExchangeFromTo}>
        <img className={s['img']} width="25" height="25" src={switchImg} />
      </div>
      <div className={s['station']} onClick={handleCityToClick}>
        <input type="text" className={[s['input'], s['to']].join(' ')} value={to} readOnly/>
      </div>
    </div>
  )
}