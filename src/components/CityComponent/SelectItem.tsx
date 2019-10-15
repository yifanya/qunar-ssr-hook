import * as React from 'react';
import * as s from './index.m.less';

interface ISelectItem {
  name: string
  onSelect: (m: string) => void
}

const SelectItem: React.FC<ISelectItem> = props => {
  const { name, onSelect } = props;
  const onHandleClick = React.useCallback(() => {
    onSelect(name)
  }, [onSelect])

  return (
    <button onClick={onHandleClick} className={s['button-item']}>{ name }</button>
  )
}

export default SelectItem;