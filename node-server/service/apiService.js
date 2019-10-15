const { Http } = require('../configs/http');

const http = new Http({
  baseURL: 'https://touch.train.qunar.com'
});

function trainSuggest (params, cb) {
  http.request({
    url: '/api/train/TrainStationSuggest',
    method: 'GET',
    params
  }).then(data => {
    cb(data)
  }, error => {
    console.log('trainSuggest error', error)
    throw error;
  })
}

function holiday (date, cb) {
  http.request({
    url: `http://timor.tech/api/holiday/year/${date}`,
    method: 'GET'
  }).then(data => {
    cb(data)
  })
}

function getCityInform (ip, cb) {
  http.request({
    url: `http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`,
    method: 'GET'
  }).then(data => {
    if (data.code === 0) {
      cb(data.data)
    }
  }).catch(err => {
    throw err;
  })
}

function getTrainList (params, cb) {
  http.request({
    url: 'https://touch.train.qunar.com/api/train/trains2s',
    method: 'GET',
    params
  }).then(data => {
    cb(data);
  })
}

function getTrainSeat (data, cb) {
  const params = Object.assign({}, {
    searchType: 'stasta',
    bd_source: 'qunar',
    _: Date.now(),
    needRecommondLess: '1'
  }, data)
  http.request({
    url: 'https://touch.train.qunar.com/api/train/trainSeat',
    method: 'GET',
    params
  }).then(data => {
    cb(data);
  })
}

exports.trainSuggest = trainSuggest;
exports.holiday = holiday;
exports.getCityInform = getCityInform;
exports.getTrainList = getTrainList;
exports.getTrainSeat = getTrainSeat;