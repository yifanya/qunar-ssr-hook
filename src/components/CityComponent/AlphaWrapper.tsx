import * as React from 'react';
import * as s from './index.m.less';
import AlphaIndex from './AlphaIndex';

interface IAlphaWrapper {
  alphalist: string[];
  onClick: (m: string) => void
}

const AlphaWrapper: React.FC<IAlphaWrapper> = props => {
  const { alphalist, onClick } = props;

  return (
    <div className={s['alpha-container']}>
      {
        alphalist.map(alpha => <AlphaIndex key={alpha} alpha={alpha} onClick={onClick} />)
      }
    </div>
  )
}

export default AlphaWrapper;