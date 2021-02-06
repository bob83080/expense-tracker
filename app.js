const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(routes)

// //home page
// app.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => res.render('index', { records: records }))
//     .catch(error => console.error(error))
// })

// //new page
// app.get('/records/create', (req, res) => {
//   return res.render('create')
// })

// app.post('/records', (req, res) => {
//   const records = req.body
//   return Record.create(records)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


// //detail page
// app.get('/records/:id', (req, res) => {
//   const id = req.params.id
//   return Record.findById(id)
//     .lean()
//     .then(record => res.render('detail', { record }))
//     .catch(error => console.log(error))
// })

// //update page
// app.get('/records/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Record.findById(id)
//     .lean()
//     .then(record => res.render('edit', { record }))
//     .catch(error => console.log(error))
// })

// app.put('/records/:id', (req, res) => {
//   const id = req.params.id
//   const name = req.body.name
//   return Record.findById(id)
//     .then(record => {
//       record.name = name
//       return record.save()
//     })
//     .then(() => res.redirect(`/records/${id}`))
//     .catch(error => console.log(error))
// })

// //delete page

// app.delete('/records/:id', (req, res) => {
//   const id = req.params.id
//   return Record.findById(id)
//     .then(record => record.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})