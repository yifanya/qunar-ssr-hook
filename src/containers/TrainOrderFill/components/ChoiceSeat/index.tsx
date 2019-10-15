import * as React from 'react';
import * as s from './index.m.less';

interface IChoiceSeat {
  seatType: string
  personNum: number
  seatList: any[]
  changeSeatList: (s: any) => void
}

const seatListStatic = {
  '商务座': ['A', 'B', '', 'F'],
  '一等座': ['A', 'C', '', 'D', 'F'],
  '二等座': ['A', 'B', 'C', '', 'D', 'F']
}
const { useState, useEffect } = React;
const ChoiceSeat: React.FC<IChoiceSeat> = props => {
  const { seatType, personNum, seatList, changeSeatList } = props;
  const [isChoice, setISChoice] = useState(() => {
    return seatList.reduce((prev, next) => (prev + next.length), 0);
  })

  const handleClickSeat = (i: number, s: any) => {
    const SL = [...seatList];
    const L = [...seatList[i]];
    const index = L.indexOf(s);
    if (index !== -1) L.splice(index, 1);
    else L.push(s);
    SL[i] = L;
    const len = SL.reduce((prev, next) => (prev + next.length), 0);
    if (len > personNum) return;
    changeSeatList(SL);
  }

  useEffect(() => {
    const l = seatList.reduce((prev, next) => (prev + next.length), 0);
    setISChoice(l);
  }, [seatList])

  
  return (
    <div className={s['choice-seat']}>
      <div className={s['tip']}>
        <p>在线选座</p>
        <p>
          <span className={s['subject-color']}>{ isChoice }</span>
          /
          <span>{ personNum }</span>
        </p>
      </div>
      <div className={s['seats-content']}>
        <div className={s['seats']}>
          <p>窗</p>
          {
            seatListStatic[seatType].map((list: any, i: number) => {
              if (!list) return <p key="null">过道</p>
              else return (
                <div key={list}>
                  {
                    new Array(personNum + 1).join('0').split('').map((item, index) => {
                      return (
                        <p key={index} className={s['seat']} data-text={list} onClick={() => handleClickSeat(index, list)}>
                          <i className={["iconfont", "icon-zuowei", seatList[index] && seatList[index].indexOf(list) !== -1 ?  s['subject-color'] : ''].join(' ')}
                          style={{fontSize: '20px'}}>
                          </i>
                        </p>
                      )
                    })
                  }
                </div>
              )
            })
          }
          <p>窗</p>
        </div>
      </div>
    </div>
  )
}

export default ChoiceSeat;