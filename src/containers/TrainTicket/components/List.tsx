import * as React from 'react';
import * as s from './index.m.less';
import { SeatInform } from '../reducer';
import ListItem from './ListItem';
interface IList {
  list: Array<SeatInform>
  goNextPage: (m: any) => void
}

const List: React.FC<IList> = props => {
  const { list, goNextPage } = props;

  return (
    <ul className={s['m-lists-ul']}>
      {
        list.map(item => <ListItem {...item} key={item.type} goNextPage={goNextPage}/>)
      }
    </ul>
  )
}

export default List;