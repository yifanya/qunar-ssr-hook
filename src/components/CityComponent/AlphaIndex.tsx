import * as React from 'react';
import * as s from './index.m.less';

interface IAlphaIndex {
  alpha: string,
  onClick: (m: string) => void
}

const AlphaIndex: React.FC<IAlphaIndex> = props => {
  const { alpha, onClick } = props;

  const handleClick = (e: React.MouseEvent) => onClick(alpha);

  return (
    <a className={s['alpha']} onClick={handleClick}>
      <span>{ alpha }</span>
    </a>
  )
}

export default React.memo(AlphaIndex);