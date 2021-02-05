const mongoose = require('mongoose')
const categories = require('../Category')

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  categories.create(
    { name: '家居物業' },
    { name: '交通出行' },
    { name: '休閒娛樂' },
    { name: '餐飲食品' },
    { name: '其他' }
  )
  console.log('done')
})