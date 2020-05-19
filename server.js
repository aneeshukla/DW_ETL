const express = require('express')
const bodyParser = require('body-parser')
const initializer = require('./initializer')

// dependencies
// const { Location, Time, Maker, CarModel, Fact } = require('./db')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

const port = 3000

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

app.get('/init', (req, res)=>{
  initializer.begin();
  res.send('It has begun! :D')
});