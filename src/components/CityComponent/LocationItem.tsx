import * as React from 'react';
import * as s from './index.m.less';
import { getCityInform } from '../../service/QunarIndex';
import './index.less';

interface ILocationItem {
  onSelet: (m: string) => void
}

const { useEffect, useState } = React;

const LocationItem: React.FC<ILocationItem> = props => {
  const { onSelet } = props;
  const [location, setLocation] = useState({
    name: '定位',
    has: false
  });
  useEffect(() => {
    let script =  document.createElement('script');
    script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
    document.body.appendChild(script);
    script.onload = function () {
      getCityInform(window.returnCitySN.cip).then(data => {
        setLocation({name: (data as any).city, has: true})
      })
    }
    return () => {
      script.onload = null;
      document.body.removeChild(script);
    }
  }, []);

  const onHandleClick = React.useCallback(() => {
    if (location.has)
      onSelet(location.name);
  }, [location, onSelet])

  return  <button className={s['button-item']} onClick={onHandleClick}>
            <i className="iconfont icon-weizhi"></i>
            { location.name }
          </button>
}

export default LocationItem;