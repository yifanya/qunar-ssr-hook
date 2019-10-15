import * as React from 'react';
import * as s from './index.m.less';
import { connect } from 'react-redux';
import { GlobalStateType } from 'src/store/reducers';
import { default as useLoading } from './useLoading'; 
const v1 = require('./images/v1.gif');
const v2 = require('./images/v2.gif');
const v3 = require('./images/v3.gif');

const ImageState = [v1, v2, v3]

interface ILoadingState {
  loading: boolean
}

const Loading: React.FC<ILoadingState> = props => {
  const { loading } = props;
  const [ imgNum, pos ] = useLoading(loading);

  return (
    <div className={s['loading-wrap']} style={{display: loading ? 'block' : 'none'}}>
      <div className={s['loading']}>
        <div className={s['loading-content']} style={{backgroundPositionX: `${pos}%`}}>
          <img src={ImageState[imgNum]} style={{width: '80px', verticalAlign: 'bottom'}}/>
        </div>
        <p className={s['loading-text']}>正在筛选，请稍后...</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state: GlobalStateType) => {
  return {
    loading: state.GlobalReducer.loading
  }
}

export default connect(mapStateToProps)(Loading);