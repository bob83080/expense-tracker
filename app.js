const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
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
app.use(bodyPraser.urlencoded({ extended: true }))
//home page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records: records }))
    .catch(error => console.error(error))
})

//new page
app.get('/records/create', (req, res) => {
  return res.render('create')
})

app.post('/records', (req, res) => {
  const records = req.body
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//detail page
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})