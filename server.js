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
  olap.initCube().then((data)=>{
    res.send(data);
  });
});

app.get('/dice/test', (req, res) => {
  olap.dice().then((data)=>{
    res.send(data);
  });
});

app.get('/slice/test', (req, res) => {
  res.json(olap.slice());
});

app.get('/drillup/test', (req, res) => {
  res.json(olap.drillUp());
});

app.get('/drilldown/test', (req, res) => {
  res.json(olap.drillDown());
});

