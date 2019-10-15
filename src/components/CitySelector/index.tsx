import * as React from 'react';
import * as s from './index.m.less';
import Header from '../../components/Header';
import CitySection from '../CityComponent/CitySection';
import SelectSection from '../CityComponent/SelectSection';
import SearchList from '../CityComponent/SearchList';
import AlphaWrapper from '../CityComponent/AlphaWrapper';

import { debounce } from '../../utils/Utils';
import { trainSuggest } from '../../service/QunarIndex';

const { useState, useMemo, useEffect, useCallback } = React;
interface ICitySelector {
  show: boolean
  cityData: {
    hotCities: Array<{ name: string }>,
    cityList: Array<{
      citys: Array<{ name: string }>
      title: string
    }>,
    version: number
  }
  onBack: (m: boolean) => void
  fetchCityData: () => void
  onSelect: (m: string) => void
  alphalist: string[]
}

const CitySelector: React.FC<ICitySelector> = props => {
  const { show, cityData, onBack: onBackFunc, fetchCityData, onSelect, alphalist } = props;
  const [Modal, setModal] = useState({name: '',hidden: true});
  const [inputState, setInputState] = useState('');
  const onBack = React.useCallback(() => { onBackFunc(false) }, []);
  const key = useMemo(() => inputState.trim(), [inputState]);
  const onClickAlpha = (m: string) => {
    setModal({name: m,hidden: false})
    setTimeout(() => { setModal({name: '', hidden: true}) }, 1000)
    const dom = document.querySelector(`[data-cate=${m}]`) as HTMLElement;
    dom.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  const [searchList, setSearchList] = useState([]);

  const eventDebounce = useCallback(debounce(function (val: string) {
    trainSuggest({keyword: val, rtype: 4, _: Date.now()}).then(data => {
      setSearchList((data as any).dataMap.result)
    })
  }), [])
  const onChangeCityInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.nativeEvent;
    setInputState((event.target as HTMLInputElement).value);
    eventDebounce((event.target as HTMLInputElement).value);
  }, []);

  useEffect(() => {
    if (!show || cityData ) return;
    fetchCityData()
  }, [show, cityData]);

  return (
    <div className={[s['city-selector'], show ? '': s['hidden']].join(' ')}>
      <Header
        onBack={onBack}
        title={() => (
          <>
            <input
              className={s['search-input']}
              placeholder="城市、车站的中文或拼音"
              value={inputState}
              onChange={onChangeCityInput}
            />
            <a
              onClick={e => setInputState('')}
              className={[s['clear-search'],  key.length === 0 ? s['hidden'] : ''].join(' ')}
            >
              <i className="iconfont icon-guanbi"></i>
            </a>
          </>
        )}
      />
      <AlphaWrapper alphalist={alphalist} onClick={onClickAlpha}/>
      <SelectSection title="定位" onSelect={onSelect} />
      { inputState && <SearchList searchList={searchList || []} onSelect={onSelect}/>}
      { cityData && <SelectSection title="热门" cityList={cityData.hotCities} onSelect={onSelect}/> }
      {
        cityData && cityData.cityList && cityData.cityList.map(({citys, title}) => 
          <CitySection key={title} onSelet={onSelect} cityList={citys} title={title}/>
        )
      }
      <div className={[s['modal'], Modal.hidden ? s['hidden'] : ''].join(' ')}>
        { Modal.name }
      </div>
    </div>
  )
}

export default CitySelector