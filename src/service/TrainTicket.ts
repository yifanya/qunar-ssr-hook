import http from './index';

export const getSeatInform = (params: any) => {
  return http.request({
    url: '/api/trainSeat',
    method: 'GET',
    params
  })
}