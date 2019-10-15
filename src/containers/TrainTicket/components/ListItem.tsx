import * as React from 'react';
import * as s from './index.m.less';

// const { useCallback } = React;
interface IListItem {
  type: string                // 座位等级
  price: string               // 座位价格
  remainTicket: string        // 座位余票
  goNextPage: (m: any) => void
}

const ListItem: React.FC<IListItem> = props => {
  const { type, price, remainTicket, goNextPage } = props;
  const noop = () => {
    if (remainTicket === '无票') return;
    goNextPage({type, price, remainTicket})
  }
  return (
    <li className={s['list-item']}>
      <span className={s['seat']}>{ type }</span>
      <span className={s['price']}>
        <i>¥</i>{ price }
      </span>
      <span className={[s['btn'], remainTicket === '无票' ? s['disabled'] : ''].join(' ')} onClick={noop}>买票</span>
      <span className={s['num']}>{ remainTicket }</span>
    </li>
  )
}

export default ListItem;