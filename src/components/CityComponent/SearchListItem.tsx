import * as React from 'react';
import * as s from './index.m.less';

interface ISearchList {
  name: string
  onClick: (m: string) => void
  title: string
}

const SearchList: React.FC<ISearchList> = props => {
  const { name, onClick, title } = props;
  return (
    <a onClick={() => onClick(title)}>
      <p className={s['suggest-item']}>
        { name }
      </p>
    </a>
  )
}

export default React.memo(SearchList);