import * as React from 'react';
import * as s from './index.m.less';

interface ISubmit {
  onClick: () => void
}

const Submit: React.FC<ISubmit> = props => {
  const { onClick } = props;

  return (
    <a role="button" className={s['search-btn']} onClick={onClick}>
      <span>搜 索</span>
    </a>
  )
}

export default Submit;