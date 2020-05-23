const express = require('express');
const bodyParser = require('body-parser');
const initializer = require('./initializer');
const controller = require('./controller');
const olap = require('./olap');

// dependencies
// const { Location, Time, Maker, CarModel, Fact } = require('./db')

const app = express()
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// API ENDPOINTS

const port = 3001

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

app.get('/init', (req, res) => {
  res.send(initializer.begin());
});

app.get('/facts/all', (req, res) => {
  controller.getFacts().then((data) => {
    res.json(data);
  });
});

app.get('/cube/init', (req, res) => {
  olap.initCube().then((data) => {
    res.send(data);
  });
});

app.get('/dice/test', (req, res) => {
  olap.dice().then((data) => {
    res.send(data);
  });
});

app.get('/slice/test', (req, res) => {
  res.json(olap.slice());
});

app.get('/rollup', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  res.json(olap.rollUp(from, to));
});

// TODO : combine drill up and

app.get('/drilldown', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  res.json(olap.drillDown(from, to));
});

app.get('/dimension/:name', (req, res) => {
  let dimension = req.params.name;
  res.json(olap.getDimensionMembers(dimension));
});

app.get('/query', (req, res) => {
  res.json(olap.query(req.query));
});

app.get('/query/sum', (req, res) => {
  res.json(olap.querySum(olap.query(req.query)));
});

app.get('/query/max/:type', (req, res) => {
  res.json(olap.queryMax(olap.query(req.query), req.params.type));
});

app.get('/query/min/:type', (req, res) => {
  res.json(olap.queryMin(olap.query(req.query), req.params.type));
});

app.get('/query/avg', (req, res) => {
  res.json(olap.queryAvg(olap.query(req.query), req.params.type));
});

app.get('/query/range/:fact', (req, res) => {
  res.json(olap.queryRange(olap.query(req.query), req.params.fact, req.query.from, req.query.to));
});

app.get('/query/rangeAvg/:fact', (req, res) => {
  res.json(olap.queryAvg(olap.queryRange(olap.query(req.query), req.params.fact, req.query.from, req.query.to)));
});