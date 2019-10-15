import http from './index';

export const getCityData = () => {
  return http.request({
    url: '/api/cities',
    method: 'GET'
  })
}

export const trainSuggest = (params: any) => {
  return http.request({
    url: '/api/trainSuggest',
    method: 'GET',
    params
  })
}

export const getHoliday = (params: any) => {
  return http.request({
    url: '/api/holiday',
    method: 'GET',
    params: {
      date: params
    }
  })
}

export const getCityInform = (params: any) => {
  return http.request({
    url: '/api/getCityInform',
    method: 'GET',
    params: {
      ip: params
    }
  })
}