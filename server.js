const express = require('express');
const bodyParser = require('body-parser');
const initializer = require('./initializer');
const controller = require('./controller');
const olap = require('./olap');

// dependencies
// const { Location, Time, Maker, CarModel, Fact } = require('./db')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

const port = 3000

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
  let queryInput = {
    country: req.query.country,
    city:  req.query.city,
    year: req.query.year,
    month: req.query.month,
    maker: req.query.maker,
    model: req.query.model,
    fuel_type: req.query.fuel_type,
    ceo: req.query.ceo,
    factory: req.query.factory
  }
  res.json(olap.query(queryInput));
});