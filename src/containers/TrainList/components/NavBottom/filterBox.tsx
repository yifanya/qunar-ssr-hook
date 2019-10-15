import * as React from 'react';
import * as s from './index.m.less';

interface IFilter {
  title: string
  name: string
  data?: Array<{ name: string, value: string }>
  onChange?: (m: Action) => void
  filterArr?: string[]
}

const FilterBox: React.FC<IFilter> = props => {
  const { name, title, data, children, filterArr, onChange } = props;
  const handleClick = React.useCallback((v: string) => {
    const arr = filterArr && JSON.parse(JSON.stringify(filterArr));
    const has: number = filterArr && filterArr.indexOf(v) || 0;
    if (has < 0) arr.push(v);
    else arr.splice(has, 1);
    onChange && onChange({
      type: name && name,
      data: arr
    })
  }, [onChange, filterArr]);

  return (
    <>
      <h3 className={s['options-title']}>{ title }</h3>
      {
        children ? children :
        <ul className={s['options-list']}>
          {
            data && data.map(item => {
              const hasSelected = filterArr && filterArr.some(i => item.value === i);
              return <li onClick={() => handleClick(item.value)} key={item.value} className={[s['options-list-item'], hasSelected ? s['options-list-item-choiced'] : ''].join(' ')}>{ item.name }</li>
            })
          }
        </ul>
      }
    </>
  )
}

export default FilterBox;