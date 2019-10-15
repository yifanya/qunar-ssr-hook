import * as React from 'react';
import * as s from './index.m.less';

const { memo, useState, useEffect, useRef, useCallback } = React;

interface IRangeSlider {
  onChange: (m: Action) => void
  filterDate: { start: number, end: number}
  name: string
}

const sliderBtnWidth = 13;
const sliderWidth = 200;
const RangeSlider: React.FC<IRangeSlider> = props => {
  const { onChange, filterDate, name } = props;
  const leftBtnRef = useRef<HTMLAnchorElement>(null);  // 左边按钮的dom
  const rightBtnRef = useRef<HTMLAnchorElement>(null); // 右边按钮的dom

  const [start, setStart] = useState((sliderWidth / 24 * filterDate.start));
  const [end, setEnd] = useState((sliderWidth / 24 * filterDate.end - sliderBtnWidth));

  const handleTouchLeft = useCallback((e) => {    
    const s = start, en = end;
    const w = (window.screen.width - sliderWidth) / 2;
    if (e.target.classList && e.target.classList.contains(s['slider-handle']) >= 0) {
      const pos = e.touches[0].clientX - w;
      if (pos >= 0 && pos <= en) {
        setStart(pos);
        onChange({
          type: name,
          data: `${Math.floor(start / (200 / 26))}:00-${ Math.floor(end / (200 / 26)) }:00`
        })
      }
    }
  }, [start, end]);
  const handleTouchRight = useCallback((e) => {
    const s = start, en = end;
    const w = (window.screen.width - sliderWidth) / 2;
    if (e.target.classList && e.target.classList.contains(s['slider-handle']) >= 0) {
      const pos = e.touches[0].clientX - w;
      if (pos >= s && pos <= sliderWidth - sliderBtnWidth) {
        setEnd(pos);
        onChange({
          type: name,
          data: `${Math.floor(start / (200 / 26))}:00-${ Math.floor(end / (200 / 26)) }:00`
        })
      }
    }
  }, [start, end])

  useEffect(() => {
    leftBtnRef.current && leftBtnRef.current.addEventListener('touchmove', handleTouchLeft)
    rightBtnRef.current && rightBtnRef.current.addEventListener('touchmove', handleTouchRight)
    return () => {
      leftBtnRef.current && leftBtnRef.current.removeEventListener('touchmove', handleTouchLeft)
      rightBtnRef.current && rightBtnRef.current.removeEventListener('touchmove', handleTouchRight)
    }
  })

  return (
    <div className={s['range-slider']}>
      <div className={s['slider']}>
        <div className={s['silder-range']} style={{left: 0, right: 0}}></div>
        <a className={s['slider-handle']} ref={leftBtnRef} style={{left: `${start}px`}}>
          <span>{ Math.floor(start / (200 / 26)) }:00</span>
        </a>
        <a className={s['slider-handle']} ref={rightBtnRef} style={{left: `${end}px`}}>
          <span>{ Math.floor(end / (200 / 26)) }:00</span>
        </a>
      </div>
    </div>
  )
}

export default RangeSlider;