import * as React from 'react';
import * as s from './index.m.less';
import SearchListItem from './SearchListItem';

interface ISearchList {
  onSelect: (m: string) => void,
  searchList: any[]
}

const SearchList: React.FC<ISearchList> = props => {
  const { onSelect, searchList } = props;

  return (
    <div className={[s['search-suggest-box'], searchList.length ? '' : s['hidden']].join(' ')}>
      {
        searchList.map(({key, display}) => <SearchListItem key={key} name={display} title={key} onClick={onSelect}/>)
      }
    </div>
  )
}

export default SearchList