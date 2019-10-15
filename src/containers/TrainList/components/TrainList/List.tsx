import * as React from 'react';
import * as s from './index.m.less';
import ListItem from './ListItem';
import { TrainListData } from '../../reducer';
import { RouteComponentProps } from 'react-router-dom';

const { memo } = React;

interface IList {
  route: RouteComponentProps
  List: Array<TrainListData>
  departDate: number
}

const List: React.FC<IList> = memo(props => {
  const { List, route, departDate } = props;

  return (
    <ul className={s['list-wrap']}>
      {
        List.map(item => <ListItem route={route} {...item} departDate={departDate} key={`${item.trainNumber}+${item.date}`} />)
      }
    </ul>
  ) 
})

export default List;