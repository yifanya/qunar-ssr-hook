import * as React from 'react';
import * as s from './index.m.less';

// type Title = () => React.ReactNode | string,

interface IHeader {
  onBack: React.MouseEventHandler,
  title: string | (() => React.ReactNode),
}

export default function Header (props: IHeader) {
  const { onBack, title } = props;
  return (
    <header className={s['header']}>
      <div className={s['back']} onClick={onBack}>
        <svg width="42" height="42">
          <polyline 
            points="25,13 16,21 25,29"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      { (typeof title === 'function') ? 
          <div className={s['node-title']}>
          { title() }
          </div> : 
        <h1 className={s['title']}>{ title }</h1>
      }
    </header>
  )
}