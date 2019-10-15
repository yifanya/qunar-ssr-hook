import * as React from 'react';
import * as s from './index.m.less';
import CityItem from './CityItem';

interface ICitySection {
  cityList?: Array<{ name: string }>,
  onSelet: (m: string) => void,
  title: string
}

const CitySection: React.FC<ICitySection> = props => {
  const { title, cityList, onSelet } = props;
  return (
    <>
      <h3 className={s['city-title']} data-cate={title}>{ title }</h3>
      <ul className={s['city-ul']}>
        {
          cityList && cityList.map(city => <CityItem key={city.name} name={city.name} onSelect={onSelet} />)
        }
      </ul>
    </>
  )
}

export default CitySection;