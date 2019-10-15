import http from './index';
import { TrainListData } from '../containers/TrainList/reducer';

export const getTrainList = (params: any) => {
  return http.request<TrainListData>({
    url: '/api/getTrainList',
    method: 'GET',
    params
  })
}