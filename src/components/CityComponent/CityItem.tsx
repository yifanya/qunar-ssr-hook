import * as React from 'react';
import * as s from './index.m.less';

interface ICityItem {
  name: string,
  onSelect: (m: string) => void
}

const CityItem: React.FC<ICityItem> = props => {
  const { name, onSelect} = props;
  return (
    <li className={s['city-item']} onClick={() => onSelect(name)}>
      { name }
    </li>
  )
}

export default CityItem;