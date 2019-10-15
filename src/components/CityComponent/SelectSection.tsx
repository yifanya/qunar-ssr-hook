import * as React from 'react';
import * as s from './index.m.less';
import SelectItem from './SelectItem';
import LocationItem from './LocationItem';

interface ISelectSection {
  cityList?: Array<{ name: string }>
  onSelect: (m: string) => void
  title: string
}

const SelectSection: React.FC<ISelectSection> = props => {
  const { onSelect, cityList, title } = props;

  return (
    <>
      <h3 className={s['city-title']} data-cate={title}>{ title }</h3>
      <div className={[s['back'], s['gird-wapper']].join(' ')} style={{ 'justifyContent': cityList && cityList.length >=3 ? 'space-between' : 'flex-start' }}>
        {
          cityList ? cityList.map(city => 
            <SelectItem key={city.name} name={city.name} onSelect={onSelect}/>
          ) :
          <LocationItem onSelet={onSelect}/>
        }
      </div>
    </>
  )
}

export default SelectSection;