import * as React from 'react';
import * as s from './index.m.less';
import { Passenger } from '../../reducer';
import Select from '../../components/Select';
import { CardList, sex as SexList } from '../../reducer';

let ID = 1;
interface IPersonInform {
  list: Array<Passenger>
  changeInform: (list: Array<Passenger>) => void
}

const { useCallback, useState } = React;
const PersonInform: React.FC<IPersonInform> = props => {
  const { list, changeInform } = props;
  const [selectStatus, setSelectStatus] = useState(false);
  const [SelectList, setSelectList] = useState<Array<{ value: string,name: string }>>([]);
  const [userID, setUserID] = useState(0);

  const addUserInform = useCallback(() => {
    const List = [...list]
    List.push({
      name: '',
      IDcard: '',
      id: ++ID,
      sex: '0',
      cardType: 0,
      birthday: ''
    })
    changeInform(List);
  }, [list, changeInform]);
  const changeSelectData = useCallback((value: {name: string, value: string}) => {
    const L = list.map(item => {
      if (item.id === userID) {
        if (SelectList.length === 2) item.sex = value.value;
        else item.cardType = Number(value.value)
      }
      return item;
    })
    changeInform(L)
    setSelectStatus(false);
  }, [userID, setSelectStatus, list, SelectList, changeInform]);
  const handleChange = useCallback((id: number) => {
    return (e: React.SyntheticEvent<HTMLInputElement>) => {
      const ele = e.currentTarget;
      const key = ele.getAttribute('name') || '';
      const L = list.map(item => {
        if (item.id === Number(id)) {
          item[key] = ele.value;
        }
        return item
      })
      changeInform(L);
    }
  }, [changeInform, list]);
  const handleDelete = useCallback((n: number) => {
    const L = list.filter(item => (item.id !== n));
    changeInform(L)
  }, [changeInform, list]);

  return (
    <div className={s['passengerInfo']}>
    <ul className={s['passenger-list']}>
      {
        list.map(item => {
          return (
            <li className={s['passenger_person']} key={item.id} >
              <i className={s['passenger-delete']} onClick={() => handleDelete(item.id)}>-</i>
              {
                item.cardType === 0 &&  
                  <ol>
                    <li className={s['nameLi']}>
                      <label className={s['passenger_label']}>姓名</label>
                      <input className={s['passenger_value']} type="text" name={'name'} placeholder="乘客姓名" value={item.name} onChange={handleChange(item.id)} />
                    </li>
                    <li className={s['IDcardLi']}>
                      <label className={[s['passenger_label'], s['arrowBottom']].join(' ')} onClick={() => {setSelectList(CardList);setUserID(item.id);setSelectStatus(true)}}>
                        <span>身份证</span>
                      </label>
                      <input className={s['passenger_value']} type="text" name={'IDcard'} placeholder="身份证号码" value={item.IDcard} onChange={handleChange(item.id)} />
                    </li>
                  </ol>
              }
              {
                item.cardType !== 0 &&  
                  <ol>
                    <li className={s['nameLi']}>
                      <label className={s['passenger_label']}>姓名</label>
                      <input className={s['passenger_value']} type="text" name={'name'} placeholder="乘客姓名" value={item.name} onChange={handleChange(item.id)}></input>
                    </li>
                    <li className={[s['IDcardLi'], s['nameLi']].join(' ')}>
                      <label className={[s['passenger_label'], s['arrowBottom']].join(' ')} onClick={() => {setSelectList(CardList);setUserID(item.id);setSelectStatus(true)}}>
                        <span>
                          { item.cardType === 1 && '护照' }
                          { item.cardType === 2 && '港澳通行证' }
                          { item.cardType === 3 && '台胞证' }
                        </span>
                      </label>
                      <input className={s['passenger_value']} type="text" name={'IDcard'} placeholder="请正确填写" value={item.IDcard} onChange={handleChange(item.id)}></input>
                    </li>
                    <li className={s['nameLi']}>
                      <label className={[s['passenger_label'], s['arrowBottom']].join(' ')} onClick={() => {setSelectList(SexList);setUserID(item.id);setSelectStatus(true)}}>性别</label>
                      <div style={{backgroundColor: '#ebebe5', flex: '1 1'}}>
                        <input className={[s['passenger_value']].join(' ')} type="text" disabled={true} name={'sex'} placeholder="请选择" value={item && item.sex === '1' ? '女' : '男'}></input>
                      </div>
                    </li>
                    <li className={s['nameLi']}>
                      <label className={[s['passenger_label']].join(' ')}>出生日期</label>
                      <input className={s['passenger_value']} type="text" name={'birthday'} placeholder="如 19951015" value={item.birthday} onChange={handleChange(item.id)}></input>
                    </li>
                  </ol>
              }
            </li>
          )
        })
      }
    </ul>
    <section className={s['addPassengerCon']}>
      <p onClick={addUserInform}>添加用户</p>
    </section>

    <Select selectList={SelectList} changeSelectData={changeSelectData} state={selectStatus} changeSelectStatus={setSelectStatus}/>
  </div>
  )
}

export default PersonInform;