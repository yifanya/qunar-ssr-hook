const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const apiService = require('../service/apiService');

router.get('/cities', (req, res) => {
  res.setHeader("Content-Type","application/json;charset=UTF-8");
  fs.createReadStream(path.join(__dirname, './cityData.json'), {
    encoding: 'utf8'
  }).pipe(res);
})

router.get('/trainSuggest', (req, res) => {
  const { keyword, rtype, _ } = req.query;
  apiService.trainSuggest({
    keyword, rtype, _
  }, data => {
    res.json(data)
  });
})

router.get('/holiday', (req, res) => {
  const { date } = req.query;
  apiService.holiday(date, data => {
    res.json(data);
  })
})

router.get('/getCityInform', (req, res) => {
  const { ip } = req.query;
  apiService.getCityInform(ip, data => {
    res.json(data);
  })
})

router.get('/getTrainList', (req, res) => {
  const {
    startStation, 
    endStation, 
    e, 
    f, 
    wakeup, 
    departDate, 
    filterTrainType, 
    onlyTickets, 
    sort, 
    filterTicketType, 
    filterStation, 
    filterNewDepTimeRange, 
    filterNewArrTimeRange 
  } = req.query;

  // console.log('req.query', {
  //   startStation,
  //   endStation,
  //   e,
  //   f,
  //   wakeup,
  //   date: departDate,
  //   searchType: 'stasta',
  //   bd_source: 'qunar',
  //   filterTrainType: filterTrainType,
  //   onlyTickets,
  //   sort,
  //   filterTicketType,
  //   filterStation,
  //   filterNewDepTimeRange,
  //   filterNewArrTimeRange
  // });

  apiService.getTrainList({
    startStation,
    endStation,
    e,
    f,
    wakeup,
    date: departDate,
    searchType: 'stasta',
    bd_source: 'qunar',
    filterTrainType: filterTrainType,
    onlyTickets,
    sort,
    filterTicketType,
    filterStation,
    filterNewDepTimeRange,
    filterNewArrTimeRange
  }, data => {
    res.json(data)
  })
})


// 获取列车座位页面的信息
router.get('/trainSeat', (req, res) => {
  apiService.getTrainSeat(req.query, data => {
    res.json(data)
  })
})

module.exports = router;