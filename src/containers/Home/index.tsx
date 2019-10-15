import * as React from 'react';
import QunarIndex from '../QunarIndex/index';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalStateType } from 'src/store/reducers';

type IStateToProps = GlobalStateType['GlobalReducer'];

interface IProps{
  route: RouteComponentProps
}

const App: React.FC<IProps & IStateToProps>  = props => {
  return (
    <QunarIndex route={props.route}/>
  )
}

const mapStateToProps = (state: GlobalStateType) => {
  return {
    userInfo: state.GlobalReducer.userInfo
  }
}

export default connect(mapStateToProps)(App);