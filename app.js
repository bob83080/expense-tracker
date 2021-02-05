const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const Record = require('./models/record')
const Category = require('./models/category')

const app = express()

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//home page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records: records }))
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})