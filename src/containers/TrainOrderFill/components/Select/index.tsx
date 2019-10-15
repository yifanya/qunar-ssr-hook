import * as React from 'react';
import * as s from './index.m.less';

interface ICardSelect {
  selectList: Array<{name: string, value: string}>
  state: boolean
  changeSelectData: (s: {name: string, value: string}) => void
  changeSelectStatus: Function
}

const { useMemo } = React;
const CardSelect: React.FC<ICardSelect> = props => {
  const { selectList, state, changeSelectData, changeSelectStatus } = props;
  const height = useMemo(() => (selectList.length * 48 + 40), [selectList.length]);
  const handleChange = (v: {name: string, value: string}) => changeSelectData(v);

  return (
    <ul className={s['select-wrap']} style={{ height: state ? `${height}px` : '0px' }}>
      <li className={s['select-title']} key={'null'}>
        <a onClick={() => changeSelectStatus(false)}>
          <em></em><em></em>
        </a>
      </li>
      {
        selectList.map(item => {
          return (
            <li
              className={[s['select-options']].join(' ')}
              key={item.value}
              data-value={item.value}
              onClick={() => handleChange(item)}>
              { item.name }
            </li>
          )
        })
      }
    </ul>
  )
}

export default CardSelect;